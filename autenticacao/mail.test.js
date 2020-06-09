const test = require("blue-tape");
const mail = require("./mail");

function runTests() {
  test("Send mail", async (t) => {
    const mailInfo = await mail.send(
      "test@email.com",
      "Teste envio mail",
      "Corpo do email a ser enviado"
    );

    t.assert(mailInfo.messageId, "Mail sent");
  });
}

module.exports = { runTests };
