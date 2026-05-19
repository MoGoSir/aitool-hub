"use client";

import { useLanguage } from "@/lib/LanguageContext";

export default function PrivacyPage() {
  const { language } = useLanguage();
  const isZh = language === "zh";

  return (
    <div className="mx-auto max-w-[1000px] px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {isZh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        {isZh ? "最后更新时间: 2026年1月1日" : "Last Updated: January 1, 2026"}
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "概述" : "Overview"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "AIToolHub（以下简称"我们"或"本网站"）重视您的隐私。本隐私政策旨在帮助您了解我们如何收集、使用、存储和保护您的个人信息。通过使用本网站，即表示您同意本隐私政策中描述的做法。"
              : 'AIToolHub ("we," "us," or "our") values your privacy. This Privacy Policy is designed to help you understand how we collect, use, store, and protect your personal information. By using this website, you consent to the practices described in this Privacy Policy.'}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "信息收集" : "Information We Collect"}
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {isZh ? "自动收集的信息" : "Automatically Collected Information"}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                {isZh ? "当您访问本网站时，我们可能会自动收集以下信息：" : "When you visit our website, we may automatically collect the following information:"}
              </p>
              <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {isZh ? (
                  <>
                    <li>设备信息（浏览器类型、操作系统、设备型号）</li>
                    <li>IP 地址</li>
                    <li>访问时间戳</li>
                    <li>引荐来源页面</li>
                    <li>您在网站上的浏览行为（点击的页面、停留时间）</li>
                  </>
                ) : (
                  <>
                    <li>Device information (browser type, OS, device model)</li>
                    <li>IP address</li>
                    <li>Access timestamps</li>
                    <li>Referring pages</li>
                    <li>Your browsing behavior on our site (pages clicked, time spent)</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {isZh ? "您提供的信息" : "Information You Provide"}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                {isZh ? "当您提交 AI 工具推荐或使用联系功能时，您可能需要提供：" : "When you submit AI tool recommendations or use our contact features, you may provide:"}
              </p>
              <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
                {isZh ? (
                  <>
                    <li>姓名</li>
                    <li>电子邮件地址</li>
                    <li>您提交的工具信息</li>
                  </>
                ) : (
                  <>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Information about tools you submit</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                {isZh ? "Cookie 与类似技术" : "Cookies and Similar Technologies"}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                {isZh
                  ? "我们使用 Cookie 和类似技术来增强您的浏览体验、分析网站流量以及提供个性化内容。您可以通过浏览器设置管理或禁用 Cookie。"
                  : "We use cookies and similar technologies to enhance your browsing experience, analyze website traffic, and deliver personalized content. You can manage or disable cookies through your browser settings."}
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "信息使用" : "How We Use Your Information"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh ? "我们可能将收集到的信息用于以下目的：" : "We may use the collected information for the following purposes:"}
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            {isZh ? (
              <>
                <li>提供、维护和改进我们的服务</li>
                <li>分析网站使用情况以优化用户体验</li>
                <li>发送与服务相关的通知</li>
                <li>处理您提交的工具推荐</li>
                <li>展示个性化广告</li>
                <li>遵守法律义务</li>
              </>
            ) : (
              <>
                <li>Provide, maintain, and improve our services</li>
                <li>Analyze website usage to optimize user experience</li>
                <li>Send service-related communications</li>
                <li>Process your tool submissions</li>
                <li>Display personalized advertisements</li>
                <li>Comply with legal obligations</li>
              </>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "广告与第三方服务" : "Advertising and Third-Party Services"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "本网站可能使用 Google AdSense 等第三方广告服务。这些第三方可能会使用 Cookie 来收集您的浏览信息，以向您展示相关广告。我们建议您查阅这些第三方的隐私政策。"
              : "This website may use third-party advertising services such as Google AdSense. These third parties may use cookies to collect your browsing information to show you relevant advertisements. We recommend reviewing the privacy policies of these third parties."}
          </p>
          <div className="mt-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {isZh ? "Google AdSense 隐私政策" : "Google AdSense Privacy Policy"}:{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">
                https://policies.google.com/privacy
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "信息共享" : "Information Sharing"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh ? "我们不会出售您的个人信息。在以下情况下，我们可能会共享您的信息：" : "We do not sell your personal information. We may share your information in the following circumstances:"}
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            {isZh ? (
              <>
                <li>与为您提供服务的第三方服务提供商（如托管、分析）</li>
                <li>遵守法律要求或响应法律程序</li>
                <li>保护我们的合法权益或用户安全</li>
              </>
            ) : (
              <>
                <li>With third-party service providers who help us operate our website</li>
                <li>To comply with legal requirements or respond to legal processes</li>
                <li>To protect our legitimate interests or user safety</li>
              </>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "数据安全" : "Data Security"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "我们采用合理的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。然而，互联网传输并非绝对安全，我们无法保证信息的绝对安全。"
              : "We implement reasonable technical and organizational measures to protect your personal information against unauthorized access, use, or disclosure. However, internet transmission is not absolutely secure, and we cannot guarantee absolute security."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "您的权利" : "Your Rights"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh ? "根据适用法律，您可能享有以下权利：" : "Under applicable laws, you may have the following rights:"}
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            {isZh ? (
              <>
                <li>访问您存储在我们系统中的个人信息</li>
                <li>更正不准确的个人信息</li>
                <li>要求删除您的个人信息</li>
                <li>选择退出营销通信</li>
                <li>撤回您之前给予的同意</li>
              </>
            ) : (
              <>
                <li>Access your personal information stored in our systems</li>
                <li>Correct inaccurate personal information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of marketing communications</li>
                <li>Withdraw consent previously given</li>
              </>
            )}
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            {isZh ? "如需行使这些权利，请联系我们：" : "To exercise these rights, please contact us:"}{" "}
            <a href="mailto:hello@aitoolhub.com" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">hello@aitoolhub.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "儿童隐私" : "Children's Privacy"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "我们的服务面向一般受众，不专门针对13岁以下的儿童。如果我们得知我们收集了13岁以下儿童的个人信息，我们将采取措施删除这些信息。"
              : "Our services are intended for a general audience and are not specifically directed at children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "政策更新" : "Policy Updates"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh
              ? "我们可能会不时更新本隐私政策。更新后的政策将在本页面上发布，并在必要时通过网站通知告知您。建议您定期查看本政策。"
              : "We may update this Privacy Policy from time to time. Updated policies will be posted on this page and, if necessary, communicated through website notices. We encourage you to review this policy periodically."}
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {isZh ? "联系我们" : "Contact Us"}
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {isZh ? "如果您对本隐私政策有任何疑问或建议，请通过以下方式联系我们：" : "If you have any questions or suggestions about this Privacy Policy, please contact us at:"}
          </p>
          <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <p>{isZh ? "电子邮件" : "Email"}: <a href="mailto:hello@aitoolhub.com" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">hello@aitoolhub.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
