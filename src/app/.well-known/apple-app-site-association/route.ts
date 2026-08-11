export async function GET() {
  const content = {
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "naotoadachi.com.kss.hoshimori",
          "paths": [ "*" ]
        }
      ]
    }
  };

  return new Response(JSON.stringify(content, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
