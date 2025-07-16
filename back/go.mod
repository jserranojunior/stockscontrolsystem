module github.com/jserranojunior/scs/backgo

replace (
	github.com/jserranojunior/scs/backgo/config => ./config
	github.com/jserranojunior/scs/backgo/http => ./http
	github.com/jserranojunior/scs/backgo/http/handlers => ./http/handlers
	github.com/jserranojunior/scs/backgo/http/middlewares => ./http/middlewares
	github.com/jserranojunior/scs/backgo/models => ./models
)

go 1.16

require (
	github.com/gbrlsnchs/jwt/v3 v3.0.1
	github.com/gin-contrib/cors v1.3.1
	github.com/gin-gonic/gin v1.7.3
	github.com/go-playground/validator/v10 v10.8.0 // indirect
	github.com/gocondor/core v1.4.3
	github.com/joho/godotenv v1.3.0
	github.com/json-iterator/go v1.1.11 // indirect
	github.com/mattn/go-isatty v0.0.13 // indirect
	github.com/ugorji/go v1.2.6 // indirect
	golang.org/x/crypto v0.23.0
	google.golang.org/protobuf v1.27.1 // indirect
	gorm.io/driver/mysql v1.6.0 // indirect
	gorm.io/driver/sqlite v1.6.0 // indirect
	gorm.io/gorm v1.30.0
)
