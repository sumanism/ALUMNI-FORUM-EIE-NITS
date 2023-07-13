function readUploadedFileAsText(e) {
  const t = new FileReader();
  return new Promise((r, o) => {
    (t.onerror = () => {
      t.abort(), o(new DOMException("Problem parsing input file."));
    }),
      (t.onload = () => {
        r(t.result);
      }),
      t.readAsText(e);
  });
}

const csvtojson = async function (e) {
  if ("object" == typeof e) {
    if (void 0 !== e.selector && void 0 !== e.delimiter) {
      if ("string" == typeof e.selector && "string" == typeof e.delimiter) {
        for (
          var t = e.selector,
            r = e.delimiter,
            o = document.getElementById(t),
            i = (await readUploadedFileAsText(o.files[0])).split(/\r\n|\n/),
            n = { data: [] },
            l = i[0].split(r),
            s = 1;
          s < i.length - 1;
          s++
        ) {
          for (
            var d = i[s].split(r), a = new Object(), c = 0;
            c < d.length;
            c++
          )
            a[l[c]] = d[c];
          n.data.push(a);
        }
        return new Promise((e, t) => {
          e(n);
        });
      }
      throw "selector and delimiter must be string";
    }
    throw "selector and delimiter both required";
  }
  throw "argument must be object";
};
