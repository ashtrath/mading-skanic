import { type NextPage } from "next";
import CreateMadingForm from "~/components/Form/CreateMadingForm";
import MetaTags from "~/components/Meta/MetaTags";

const DashboardCreateMadingPage: NextPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" />
      <CreateMadingForm />
    </>
  );
};

export default DashboardCreateMadingPage;
