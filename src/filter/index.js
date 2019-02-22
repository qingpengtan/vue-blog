export function tagToColor(value) {
  if (value == "Java") {
    return "static/img/tag/java.png";
  } else if (value == "Web开发") {
    return "static/img/tag/web.png";
  } else if (value == "NodeJS") {
    return "static/img/tag/nodejs.png";
  } else if (value == "Go语言") {
    return "static/img/tag/golang.png";
  } else if (value == "大数据") {
    return "static/img/tag/hadoop-online.png";
  } else if (value == "Python") {
    return "static/img/tag/python.png";
  } else {
    return "static/img/tag/other.png";
  }
}
