import mixpanel from "mixpanel-browser";

const HeroBlog = () => {
  const trackButtonClick = (Property) => {
    mixpanel.track("External Link", {
      Name: Property,
      Property: Property,
    });
  };
  return (
    <section className="py-16 text-center justify-content-center lg:max-w-3xl mx-auto">
      <h1 className="font-bold text-3xl lg:text-7xl">
      Blog articles from
people for people
      </h1>
      <p className="my-2 text-lg lg:text-xl font-normal">

      If you want to be a guest writer, don’t hesitate to ask us! Every contributors' help is really invaluable.
      </p>
      <div className="mt-4 flex justify-center">
<a href="https://www.producthunt.com/products/cloush-demo?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-cloush&#0045;demo" target="_blank"  rel="noreferrer"><img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=562280&theme=light" alt="ClousH&#0032;Demo - Connecting&#0032;hiring&#0032;teams&#0032;with&#0032;efficiency | Product Hunt"  width="250" height="54" 
          onClick={() => trackButtonClick("Product Hunt")}

/></a>
</div>
    </section>
  );
}
 
export default HeroBlog;