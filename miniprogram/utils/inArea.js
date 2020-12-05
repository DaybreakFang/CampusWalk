//判断点是否在面中
function inArea(l, p) {
  var minX = l[0].longitude,
    maxX = l[0].longitude,
    minY = l[0].latitude,
    maxY = l[0].latitude;
  for (var i = 1; i < l.length; i++) {
    if (l[i].longitude < minX) {
      minX = l[i].longitude;
    }
    if (l[i].longitude > maxX) {
      maxX = l[i].longitude;
    }
    if (l[i].latitude < minY) {
      minY = l[i].latitude;
    }
    if (l[i].latitude > maxY) {
      maxY = l[i].latitude;
    }
  }
  if (p.longitude < minX && p.longitude > maxX && p.latitude < minY && p.latitude > maxY) {
    return false // 这个测试都过不了。。。直接返回false；
  } else {
    var vertx = [],
      verty = [];
    for (var i = 0; i < l.length; i++) {
      vertx.push(l[i].longitude)
      verty.push(l[i].latitude)
    }
    var c = pnpoly(l.length, vertx, verty, p.longitude, p.latitude);
    return c;
  }
}
 
function pnpoly(nvert, vertx, verty, testx, testy) {
  var i, j, c = false;
  for (i = 0, j = nvert - 1; i < nvert; j = i++) {
    if (((verty[i] > testy) != (verty[j] > testy)) &&
      (testx < (vertx[j] - vertx[i]) * (testy - verty[i]) / (verty[j] - verty[i]) + vertx[i]))
      c = !c;
  }
  return c;
}
 
module.exports = {
  inArea: inArea,
}