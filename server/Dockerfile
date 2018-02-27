from golang:1.9
RUN go get gopkg.in/gorp.v1
RUN go get github.com/gin-gonic/gin
RUN go get github.com/lib/pq
RUN go build main.go handlers.go structs.go
ENV PORT 8080

