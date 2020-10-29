const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://image.freepik.com/vetores-gratis/icone-de-jovem-homem-dos-desenhos-animados_24908-23727.jpg",
    name: "Dr. Code",
    role: "Estudante de programação",
    description:
      'Ingressou no bootcamp a pouco, largou tudo para seguir na área de programação. Acesse seu <a href="https://github.com/MaiconDeivid-MD" target="_blank">GitHub</a> e acompanha seu desempenho</p>',
    links: [
      { name: "Github", url: "https://github.com/Souzaline" },
      { name: "Linkedin", url: "https://www.linkedin.com/in/aline-messias/" },
      { name: "Instagram", url: "https://www.instagram.com/alineapmessias/" },
    ],
  };

  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id;
  const video = videos.find(function (video) {
    return video.id == id;
  });

  if (!video) {
    return res.send("Video not found");
  }

  return res.render("video", { item: video });
});

server.listen(5000, function () {
  console.log("server is running");
});