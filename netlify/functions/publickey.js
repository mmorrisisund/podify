const publicKey = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwAxcEVYELaG6v/cdeT3u
GtZ49FBdgeB1YV8dlcZDMBcS5OjQSnqEYswe+AePvaVv6ul0ABDP7qi/yZpgRaoo
JMNhLGglGyYagdaAbvMPDwkvc7qwHsrxc8JuP7YKiuCLqwVp2xD4fnXLwPAItxcO
2t7kAqWOSjb+wagji5ApFTTpEm9vWjn3qI4bslR238V7HfrqZmc5FkypJR0BC1nf
wNd9HXPicJ8Gu/VvPU2CrSTq9ZBiYIYK7YRoeZXamUKiFjnyN6V8aQrqi0LmQBy2
n42qj4gs/NHGHBzH8Ez6YIcA9W4lrcpxJ8NXaJ6ftrKLkJknH7wVaVhU/h6D5x0s
/X4+CY9F4C6sjhB2MuLc8a9GYO6iki9YiDXKAv19HrGDkMJsvT5RBcSkKHw5ZNGG
zBqIf4jM3hgGc3iDPykKhzKRka73ys8rVTs/sa7Tgwg5YmufzqCx5HdGoAY6yJc8
cPjihuxPNRaPvIGcYxNhQQ5lKJYKYackxHQUAOaQe5QQ50ShtneFNbVzPAPdxw0K
ryJt4GQ/fMupevtcLxCXO8sNO/zrrN+mFClnKdGt3OpXeFBNvmOQKM8w43T0dZX0
ZXoWQTWfNvxZS2EKOKUl9q2X01MV8qXmvSKVWctRALeJgTEluwTjnXI3t9+vD7F+
MR8uhcVfc4o96ldhdLbahTMCAwEAAQ==
-----END PUBLIC KEY-----`
exports.publicKey = publicKey
exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'plain/text'
    },
    body: publicKey
  }
}
