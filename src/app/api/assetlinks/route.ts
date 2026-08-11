export async function GET() {
  const content = [
    {
      "relation": [
        "delegate_permission/common.handle_all_urls",
        "delegate_permission/common.get_login_creds"
      ],
      "target": {
        "namespace": "android_app",
        "package_name": "com.kss.hoshimori",
        "sha256_cert_fingerprints": [
          "46:C4:64:47:31:7F:DF:B4:BF:63:3D:24:E1:EB:12:A1:F2:9B:D1:01:12:85:5E:90:1B:E7:2C:E6:A6:2B:5A:A8"
        ]
      }
    }
  ];

  return new Response(JSON.stringify(content, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
