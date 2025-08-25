// Copyright 2021 Harran Ali <harran.m@gmail.com>. All rights reserved.
// Use of this source code is governed by MIT-style
// license that can be found in the LICENSE file.

package main

import (
	"log"
	"os"
	"time"

	"github.com/gocondor/core"
	"github.com/joho/godotenv"
	"github.com/jserranojunior/scs/backgo/config"
	"github.com/jserranojunior/scs/backgo/http"
	"github.com/jserranojunior/scs/backgo/http/authentication"
	"github.com/jserranojunior/scs/backgo/http/handlers"
	"github.com/jserranojunior/scs/backgo/http/middlewares"
	"github.com/jserranojunior/scs/backgo/models"
)

func main() {
	// New initializes new App variable

	// Carregar o fuso horário desejado
	location, err := time.LoadLocation("America/Sao_Paulo")
	if err != nil {
		log.Fatal("Error loading location: ", err)
	}

	// Exemplo de uso da variável location para mostrar o horário atual
	currentTime := time.Now().In(location)
	log.Printf("Current time in Sao Paulo: %s\n", currentTime.Format("2006-01-02 15:04:05"))

	app := core.New()

	// set env
	env, err := godotenv.Read(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	app.SetEnv(env)

	// set the app mode
	app.SetAppMode(os.Getenv("APP_MODE"))

	// What features to turn on or off
	app.SetEnabledFeatures(config.Features)

	// initialize core packages
	app.Bootstrap()

	// Register global middlewares
	middlewares.RegisterMiddlewares()

	//InitiateHandlersDependencies initiate handlers dependancies
	handlers.InitiateHandlersDependencies()

	// InitiateMiddlewaresDependencies initiate handlers dependancies
	middlewares.InitiateMiddlewaresDependencies()

	// Register routes
	http.RegisterRoutes()

	// Register Auth
	if config.Features.Authentication == true {
		// make sure the database flag is on
		if config.Features.Database == false {
			log.Fatal("authentication requires database feature to be on")
		}
		authentication.RegisterAuthRoutes()
	}

	//auto migrate tables
	if config.Features.Database == true {
		models.MigrateDB()
	}

	// Run App
	app.Run(os.Getenv("APP_HTTP_PORT"))
}
