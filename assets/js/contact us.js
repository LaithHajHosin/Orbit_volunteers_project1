document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-page form");
  if (!contactForm) return;

  const showMessage = (text, isError = false) => {
    let messageEl = document.getElementById("contact-success-message");
    if (!messageEl) {
      messageEl = document.createElement("div");
      messageEl.id = "contact-success-message";
      messageEl.className = "contact-success-message";
      contactForm.parentElement.insertBefore(messageEl, contactForm);
    }

    messageEl.textContent = text;
    messageEl.style.color = isError ? "#842029" : "#0f5132";
    messageEl.style.backgroundColor = isError ? "#f8d7da" : "#d1e7dd";
    messageEl.style.border = isError
      ? "1px solid #f5c2c7"
      : "1px solid #badbcc";
    messageEl.style.padding = "1rem";
    messageEl.style.margin = "1rem 0";
    messageEl.style.borderRadius = "8px";
  };

  const backendMessagesUrl = "http://orbitvolunteers.atwebpages.com/messages";
  const proxyMessagesUrl = `https://corsproxy.io/?${encodeURIComponent(backendMessagesUrl)}`;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const phone = formData.get("phone")?.toString().trim();
    const address = formData.get("address")?.toString().trim();
    const messageText = formData.get("message")?.toString().trim();

    if (!name || !email || !phone || !messageText) {
      showMessage("المرجو تعبئة جميع الحقول المطلوبة قبل الإرسال.", true);
      return;
    }

    showMessage("جاري إرسال الرسالة...", false);

    const apiPayload = {
      name,
      email,
      subject: "رسالة من نموذج التواصل",
      message: `${messageText}\n\nرقم الهاتف: ${phone}\nالعنوان: ${address || "غير محدد"}`,
    };

    try {
      const response = await fetch(proxyMessagesUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => null);
        const errorMessage =
          responseBody?.message ||
          `حدث خطأ أثناء الإرسال (رمز ${response.status})`;
        throw new Error(errorMessage);
      }

      const result = await response.json();
      contactForm.reset();
      showMessage(
        result.message || "تم إرسال الرسالة بنجاح. شكراً لتواصلك معنا!",
      );
    } catch (error) {
      showMessage(
        `فشل إرسال الرسالة. ${error.message || "يرجى المحاولة لاحقاً."}`,
        true,
      );
    }
  });
});
