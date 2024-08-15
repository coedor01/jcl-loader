import Loader from "jcl-loader";

describe("load module", () => {
  test("load function", () => {
    expect(
      (() => {
        const rawText = `2286309794	4388266	1716702576	198750	13	{536875601,false,0,false,0,0,0,true,0,0,false}
2981231501	4388267	1716702576	198809	25	{536872699,536872699,1,2341,7}
2976523553	4388270	1716702576	199004	13	{536943539,false,0,false,0,0,0,true,0,0,false}
`
        const loader = Loader.fromText(rawText);
        const aBuffUpdate = loader.getBuffUpdate();
      })()
    );
  });
});

