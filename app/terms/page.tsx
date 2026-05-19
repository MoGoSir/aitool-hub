export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        服务条款 / Terms of Service
      </h1>
      <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
        最后更新时间: 2026年1月1日
        <br />
        Last Updated: January 1, 2026
      </p>

      <div className="mt-12 space-y-12">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            接受条款 / Acceptance of Terms
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            欢迎访问 AIToolHub（以下简称"本网站"）。使用本网站即表示您同意遵守这些服务条款。
            如果您不同意这些条款，请不要使用本网站。
            <br />
            Welcome to AIToolHub ("the Website"). By using this website, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the Website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            服务描述 / Service Description
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            AIToolHub 是一个 AI 工具发现与导航平台，提供以下服务：
            <br />
            AIToolHub is an AI tool discovery and navigation platform that provides the following services:
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>AI 工具的收集、展示和分类 / Collection, display, and categorization of AI tools</li>
            <li>价格对比与优惠信息聚合 / Price comparison and promotion aggregation</li>
            <li>用户提交工具推荐 / User-submitted tool recommendations</li>
            <li>工具搜索与筛选功能 / Tool search and filtering features</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            用户行为准则 / User Conduct
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            在使用本网站时，您同意：
            <br />
            When using the Website, you agree to:
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>遵守所有适用的法律法规 / Comply with all applicable laws and regulations</li>
            <li>不上传虚假或误导性信息 / Not upload false or misleading information</li>
            <li>不滥用或干扰网站正常运行 / Not abuse or interfere with the normal operation of the Website</li>
            <li>不尝试获取未经授权的访问权限 / Not attempt to gain unauthorized access to the Website</li>
            <li>不使用自动化工具爬取网站内容 / Not use automated tools to scrape website content</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            知识产权 / Intellectual Property
          </h2>
          <div className="mt-6 space-y-6">
            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                网站内容 / Website Content
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                除用户提交的内容外，本网站的所有内容（包括但不限于文字、图片、设计、布局、代码）
                均受版权和其他知识产权法律保护，归 AIToolHub 或其许可方所有。
                <br />
                Except for user-submitted content, all content on this Website (including but not limited to text, images, designs, layouts, and code)
                is protected by copyright and other intellectual property laws and is owned by AIToolHub or its licensors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                用户提交内容 / User-Submitted Content
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300 leading-relaxed">
                当您提交 AI 工具推荐时，您授予我们非独占的、免费的、全球性的许可，
                允许我们在本网站及相关服务中使用、展示和分发您提交的内容。
                <br />
                When you submit AI tool recommendations, you grant us a non-exclusive, royalty-free, worldwide license
                to use, display, and distribute your submitted content on this Website and related services.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            免责声明 / Disclaimers
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            本网站按"现状"提供，不提供任何明示或暗示的保证，包括但不限于：
            <br />
            The Website is provided "as is" without any express or implied warranties, including but not limited to:
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>准确性、完整性或可靠性 / Accuracy, completeness, or reliability</li>
            <li>适用性或适合特定目的 / Merchantability or fitness for a particular purpose</li>
            <li>不间断或无错误的服务 / Uninterrupted or error-free service</li>
            <li>第三方工具或链接的可用性 / Availability of third-party tools or links</li>
          </ul>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            我们不保证本网站上展示的 AI 工具信息的准确性、及时性或完整性。
            价格信息可能发生变化，我们建议您在使用前访问工具官方网站核实最新信息。
            <br />
            We do not guarantee the accuracy, timeliness, or completeness of AI tool information displayed on this Website.
            Pricing information may change, and we recommend visiting the official websites of tools to verify the latest information before use.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            责任限制 / Limitation of Liability
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            在法律允许的最大范围内，AIToolHub 及其关联方、董事、员工或代理人不对以下情况承担责任：
            <br />
            To the maximum extent permitted by law, AIToolHub and its affiliates, directors, employees, or agents are not liable for:
          </p>
          <ul className="mt-3 ml-6 list-disc space-y-2 text-gray-600 dark:text-gray-300">
            <li>因使用本网站导致的任何直接或间接损失 / Any direct or indirect damages arising from the use of this Website</li>
            <li>数据丢失或泄露 / Loss or disclosure of data</li>
            <li>第三方工具或服务的问题 / Issues with third-party tools or services</li>
            <li>因依赖本网站信息而做出的任何决策 / Any decisions made based on reliance on information from this Website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            外部链接 / External Links
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            本网站可能包含指向第三方网站的链接。我们不对这些第三方网站的内容、隐私政策或做法负责。
            访问第三方网站的风险由您自行承担。
            <br />
            This Website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of these third-party websites.
            You access third-party websites at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            广告内容 / Advertising Content
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            本网站可能包含广告内容。广告内容由第三方提供，我们不对广告内容的准确性、真实性或可靠性负责。
            您在点击广告或购买广告产品之前，请自行核实相关信息。
            <br />
            This Website may contain advertising content. Advertising content is provided by third parties, and we are not responsible for the accuracy, authenticity, or reliability of advertising content.
            Please verify relevant information yourself before clicking on advertisements or purchasing advertised products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            条款变更 / Changes to Terms
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            我们保留随时修改本服务条款的权利。修改后的条款将在本页面发布后立即生效。
            继续使用本网站即表示您接受修改后的条款。
            <br />
            We reserve the right to modify these Terms of Service at any time. Modified terms will take effect immediately upon posting on this page.
            Your continued use of the Website constitutes your acceptance of the modified terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            适用法律与争议解决 / Governing Law and Dispute Resolution
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            本服务条款受适用法律管辖。因本服务条款引起的或与之相关的任何争议，
            应首先通过友好协商解决；协商不成的，任何一方可向有管辖权的法院提起诉讼。
            <br />
            These Terms of Service shall be governed by applicable laws. Any dispute arising from or related to these Terms of Service
            shall first be resolved through friendly negotiation; if negotiation fails, either party may file a lawsuit in a court of competent jurisdiction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            联系我们 / Contact Us
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            如果您对本服务条款有任何疑问，请通过以下方式联系我们：
            <br />
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <div className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
            <p>电子邮件 / Email: <a href="mailto:hello@aitoolhub.com" className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400">hello@aitoolhub.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
