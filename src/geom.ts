const MAX_LONG = 116.49770885584924;
const MAX_LAT = 40.001919856873684;
const MIN_LONG = 116.2558753046581;
const MIN_LAT = 39.82178159626318;

function RandomNumBoth(Min: number, Max: number) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}

function genPoint() {
  return [RandomNumBoth(MAX_LONG, MIN_LONG), RandomNumBoth(MAX_LAT, MIN_LAT)];
}

function genLineString(n: number) {
  n = n || 10;
  let ret = [];
  let i = 0;
  while (i < n) {
    ret.push(genPoint());
    i++;
  }
  return ret;
}

// todo
// function genPolygon(n: number, m: number) {}

export { genPoint, genLineString };
