import Navbar from "components/navigation/Navbar";
import Footer from "components/navigation/Footer";
import Layout from "hocs/layouts/Layout";
import icon from "assets/img/favicon.png";
import { Helmet} from "react-helmet-async";
import { useEffect } from "react";
import mixpanel from "mixpanel-browser";
import Logo from "components/navigation/FixedLogo";

function ServiceCredits() {
  useEffect(() => {
    window.scrollTo(0, 0);
    mixpanel.track("Privacy Page", {
      Type: 'Privacy',

    });
  }, []);
  mixpanel.track("Privacy Page");
  return (
    <Layout>
      <Helmet>
      <meta name="robots" content="noindex" />
      <link rel="icon" content={icon} />
        <meta name="author" content="Clous Technology SL" />
        <meta name="publisher" content="Clous" />
        <meta property="og:image" content='https://clous.s3.eu-west-3.amazonaws.com/images/ClousPeer.webp' />
        </Helmet>
        <div className="bg-[#FAFAFA] text-dark-blue-greenish text-sm font-semibold max-w-8xl px-4 sm:px-6 xl:px-16 2xl:px-24 flex-wrap w-full fixed z-30  ">

<Navbar />             
</div>
<div className="z-40 relative">
        <Logo />
      </div>
      <div className="pt-28 px-6">
        <div className="relative ">
        <h1
              className="text-4xl font-bold tracking-tight text-button-orange
               sm:text-5xl lg:text-6xl"
            >
              {" "}
              Service credits terms
            </h1>
         
        </div>
        <div className="lg:max-w-6xl mx-auto my-6 text-xl">
        <p>
        These Clous Service Credit Terms (“Terms”) are an agreement between you and Clous Technology, S.L. (or our affiliates) and govern your purchase, receipt, or use of any credit redeemable for our Services (“Service Credit”). Capitalized terms used but not defined in these Terms will have the meanings set forth in the agreement between you and Clous governing your use of the applicable Services (the “Agreement”).

We may offer the option to prepay for certain Services through the purchase of credits (“Prepaid Service Credits”). Prepaid Service Credits represent the amount you have paid in advance for use of the respective Services. Additional terms may apply to specific Services.

We may also offer Service Credits free of charge as part of a promotional program rather than for purchase (“Promo Service Credits”). Promo Service Credits will not be applied against any sales, use, gross receipts, or similar transaction based taxes that may be applicable to you.

Service Credits are not legal tender or currency; are not redeemable, refundable, or exchangeable for any sum of money or monetary value; have no equivalent value in fiat currency; do not act as a substitute for fiat currency; and do not constitute or confer upon you any personal property right. Service Credits are non-transferable and may be used only in connection with the applicable Service.

All sales of Services, including sales of prepaid Services, are final. Service Credits are not refundable and expire one year after the date of purchase or issuance if not used, unless otherwise specified at the time of purchase.

Your available Service Credit balance may be reviewed in your Clous account. You are solely responsible for verifying that the proper amount of Service Credits has been added to or deducted from your balance. Your Service Credit balance is not a bank account, digital wallet, stored value account, or other payment device.

We prohibit and do not recognize any purported transfers, sales, gifts, or trades of Service Credits. Evidence of any attempt to use, sell, or transfer Service Credits in any manner violates these Terms and may result in revocation, termination, or cancellation of the Service Credits and/or your use of the Services without refund and/or immediate suspension or termination of your account.

We reserve the right to suspend or terminate your use of the Services in accordance with the Agreement, including suspending or terminating your Service Credit balance, in compliance with applicable law.

We may modify these Terms at any time by posting a revised version on our website or by emailing the email associated with your account. The modified Terms will become effective upon posting or, if we notify you by email, as stated in the email message. By receiving or using any Service Credit after the effective date of any modification to these Terms, you agree to be bound by the modified Terms.

            </p> 
        </div>
      </div>
      <Footer />
    </Layout>
  );
}
export default ServiceCredits;
