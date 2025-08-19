// Copyright 2021 Harran Ali <harran.m@gmail.com>. All rights reserved.
// Use of this source code is governed by MIT-style
// license that can be found in the LICENSE file.

package http

import (
	"github.com/gocondor/core/routing"
	"github.com/jserranojunior/scs/backgo/http/handlers"
	"github.com/jserranojunior/scs/backgo/http/middlewares"
)

// RegisterRoutes to register your routes
func RegisterRoutes() {
	router := routing.Resolve()

	router.Get("/api/fred", middlewares.CORSMiddleware, handlers.FredYieldsHandler)

	//Define your routes here
	router.Post("/user", middlewares.CORSMiddleware, handlers.UserCreate)
	router.Get("/user", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.GetUser)
	router.Get("/admin/users", middlewares.CORSMiddleware, handlers.GetAllUsers)
	router.Put("/admin/users/:id", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.UserUpdate)

	router.Get("/useracl", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.GetUserAcl)
	router.Get("/admin/aclroutes/:id", middlewares.CORSMiddleware, handlers.GetAclRoutes)

	router.Get("/", handlers.HomeShow)
	router.Post("/login", middlewares.CORSMiddleware, handlers.AuthLogin)
	router.Get("checkniveldeacesso", middlewares.VerifyJwt, handlers.CheckNivelAclWithUserID)

	router.Get("/financial/viewcategories/:dataanomes", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.GetCategoriesAndBillsMonth)

	financial := router.Group("/financial/")
	{
		financial.Get("/categorias", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.SelectCategoriesBilsToPay)
		financial.Get("/categoriasall", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.SelectAllCategoriesBillsToPay)
		// Bills to pay
		financial.Get("/contasall", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.SelectAllBillsToPay)
		financial.Get("/editbills/:id/:dataanomes", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.EditBillsToPayMonth)

		financial.Get("/billsmonth/:id/:date", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.GetBillsMonth)

		financial.Post("/billstopay", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.StoreBillsToPay)
		financial.Put("/billstopay/:id/:dataanomes", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.UpdateBillsToPay)
		financial.Post("/paidbills", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.StorePaidBills)
		financial.Delete("/paidbills/:id", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.DeletePaidBills)
		financial.Get("/paidbills/:id", middlewares.CORSMiddleware, middlewares.VerifyJwt, handlers.EditPaidBills)
	}

	router.Get("/corretoras", middlewares.CORSMiddleware, handlers.GetCorretoras)
	router.Get("/corretoras/:id", middlewares.CORSMiddleware, handlers.GetCorretoraPorID)
	router.Post("/corretoras", middlewares.CORSMiddleware, handlers.CriarCorretora)
	router.Put("/corretoras/:id", middlewares.CORSMiddleware, handlers.AtualizarCorretora)
	router.Delete("/corretoras/:id", middlewares.CORSMiddleware, handlers.DeletarCorretora)
	router.Get("/corretorascomoperacoes", middlewares.CORSMiddleware, handlers.GetCorretorasComOperacoes)
	router.Get("/corretorascomoperacoesperformance/:data", middlewares.CORSMiddleware, handlers.GetCorretorasComOperacoesPerfomance)

	router.Get("/tickers/:corretoraID", middlewares.CORSMiddleware, handlers.GetTickersPorCorretoraID)

	router.Post("/operacoes", middlewares.CORSMiddleware, handlers.CreateOperacao)

}
