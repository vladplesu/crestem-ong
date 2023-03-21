import { useCallback, useEffect } from "react";
import Button from "@/components/Button";
import Section from "@/components/Section";
import Heading from "@/components/Heading";
import Breadcrumbs from "@/components/Breadcrumbs";
import screenshot from "@/assets/screenshot.jpg";
import { useAppSelector } from "@/redux/store";
import empty from "@/assets/empty.svg";
import TableHeadReports from "@/components/index/TableHeadReports";
import TableRowReport from "@/components/TableRowReport";
import { useCreateReportMutation } from "@/redux/api/userApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const user = useAppSelector((state) => state.userState.user);
  const [createReport, { data, isSuccess }] = useCreateReportMutation();
  const navigate = useNavigate();
  const handleClickCreate = useCallback(() => {
    createReport(null);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      navigate(`/reports/${data.id}`);
    }
  }, [navigate, isSuccess, data?.id]);

  return (
    <div>
      <Section>
        <div className={"space-y-2"}>
          <Breadcrumbs
            pages={[
              { name: "Evaluare organizațională", href: "#", current: true },
            ]}
          />
          <Heading level={"h2"}>Evaluare organizațională</Heading>
        </div>
      </Section>
      {!user?.reports?.length && (
        <Section>
          <div className="h-1/2 flex justify-center mt-0 mr-auto mb-0 ml-auto container gap-8">
            <div className="w-full h-full flex items-center justify-center pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0">
              <img src={screenshot} />
            </div>
            <div className="w-full h-full items- justify- pt-0 pr-4 pb-0 pl-4 md:w-1/2 md:mb-0 text-lg text-gray-500">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </Section>
      )}
      {user ? (
        user.reports?.length > 0 ? (
          <>
            <Section key={"reports"}>
              <p className="color-gray-500 text-lg">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.{" "}
              </p>
              <table className="min-w-full divide-y divide-gray-300">
                <TableHeadReports />
                <tbody className="divide-y divide-gray-200 bg-white">
                  {user.reports?.map((report) => {
                    return (
                      <TableRowReport
                        key={report.id}
                        id={report.id}
                        createdAt={report.createdAt}
                        deadline={report.deadline}
                        evaluations={report.evaluations}
                        finished={report.finished}
                      />
                    );
                  })}
                </tbody>
              </table>
            </Section>
            <Section>
              <div className="bg-teal-600/10 px-16 py-20 flex flex-col md:flex-row space-y-5 items-center">
                <div className="w-auto">
                  <Heading level={"h2"}>
                    Pregătit să reevaluezi organizația ?
                  </Heading>
                  <div className="text-teal-800">
                    <Heading level={"h2"}>
                      Începe o evaluare nouă pentru a vedea progresul!
                    </Heading>
                  </div>
                </div>
                <div className={"md:w-1/2 lg:w-1/3"}>
                  <div className="float-right">
                    <Button onClick={handleClickCreate}>
                      Începe evaluarea
                    </Button>
                  </div>
                </div>
              </div>
            </Section>
          </>
        ) : (
          <Section key="no-reports" className={"text-center"}>
            <img src={empty} className={"mx-auto mb-4"} />
            <Heading level={"h4"}> Nicio evaluare realizată</Heading>
            <p className={"mt-2 mb-4 max-w-xl mx-auto"}>
              Realizează evaluarea pentru a descoperi dimensiunile organizației
              care necesită dezvoltare{" "}
            </p>
            <Button onClick={handleClickCreate}>Începe prima evaluare</Button>
          </Section>
        )
      ) : (
        <Section className="bg-gray-100 bg-opacity-90 text-center py-8">
          <Heading level="h2">Înscrie-te acum</Heading>
          <p className="text-lg leading-6 font-normal mt-4 mb-8 max-w-xl mx-auto">
            Ac euismod vel sit maecenas id pellentesque eu sed consectetur.
            Malesuada adipiscing sagittis vel nulla nec.
          </p>
          <Button color="white" to="/register">
            Înregistrează-te
          </Button>
        </Section>
      )}
    </div>
  );
};

export default Home;