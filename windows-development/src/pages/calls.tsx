import { NextPage } from "next";
import { CallsTable } from "../features/Calls/components/CallsTable";
import { PageHeader } from '../features/PageHeader';

const CallsPage: NextPage = () => {
  return (
    <section>
      <PageHeader text="Звонки" aligning="center" />
      <CallsTable />
    </section>
  );
};

export default CallsPage;
