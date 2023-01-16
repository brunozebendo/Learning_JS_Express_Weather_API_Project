''/*A ideia do código é criar um site que busque informações de uma API com a
previsão do tempo, transforme isso em um dicionário json e mande para o site
uma string, junto com um figurinha. Abaixo, primeiro, as variáveis constantes
obrigatórias, há outros modos de se fazer isso, mas essa usa os módulos internos
do mdn, express e https. também é criada a constante bodyParser, necessária
para lidar com os dados no body do html*/

const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
/*abaixo, a sintaxe básica para receber informações e criar uma rota, primeiro,
criou-se a constante com a url que é da API onde vamos obter as informações,
obrigatório ter o https., ou seja, vai ser https. e a função vai pegar a url
passada. */
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});
/*aqui o query é o resultado do notão de input onde o usuário coloca o nome da
cidade que quer saber o tempo.*/
app.post("/", function(req, res){
  const query = req.body.cityName
  const apiKey = "a5ed72506958457aa2624676f3afc0c4&"
  const url = "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey+"q="+ query
  https.get(url, function(response){
    console.log(response.statusCode);
    /*a função response, acima passada como atributo, aqui retorna os dados, data,
    mas em forma encriptada, por isso o json.parse, para transformar o formato
    para JSON. Depois a variável temp pega a informação da key weatherData0 e
    a primeira informação do weatherData e weather. A Angela usou a extensão JSON
    do chrome para copiar o endereço de cada informação e assim, melhor visualizar
    onde pegar cada uma, é a parte depois do weatherData.
    */
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;;
      const weatheDescription = weatherData.weather[0].description;
      /*abaixo, o atributo res, da função get acima .send, para mandar a informação
      de volta ao site. Atentar que só pode haver um send por vez*/
      res.write("<p>The weather is currently "+ weatheDescription + "<p>");
      res.write("<h1>The temperatura"+ query +"is " + temp + " funcking degrees</h1>");
      res.send();
    });
  })
});



app.listen(3000, function(){
  console.log("the server is running on port. 3000");
})
