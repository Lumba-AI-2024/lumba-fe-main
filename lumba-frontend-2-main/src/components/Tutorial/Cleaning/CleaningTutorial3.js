import { useRouter } from "next/router";
import Breadcrumb from "../../Breadcrumb";
import Seo from "../../Seo";
import FormModalContextProvider from "../../../context/FormModalContext";
import * as React from "react";
import Select from "../../Select/Select";
import AccordionForm from "../../Form/AccordionForm";
import AccordionSelect from "../../Select/AccordionSelect";
import MultiSelect from "../../Select/MultiSelect";
import ChevronDoubleLeft from "../../Icon/ChevronDoubleLeft";
import { motion } from "framer-motion";
import { useStep } from "../Steps";
import { useSearchParams } from "next/navigation";
import { Step, StepContent, StepTitle, StepDescription } from "../Steps";
import Image from "next/image";

const CleaningTutorial3 = () => {
  const router = useRouter();
  const { workspaceName } = router.query;

  const { step: currentStep } = useStep();

  const isOpen = true;

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (currentStep !== 3) {
    return null;
  }

  return (
    <>
      <Seo title={`${workspaceName} - Cleaning`} />
      <div className="h-full flex flex-col">
        <Breadcrumb
          links={[{ label: "Lorem Project" }, { label: "Cleaning", href: "/workspace/" + workspaceName + "/cleaning" }]}
          active={"Cleaning"}
        />
        <FormModalContextProvider>
          <div className="mt-6">
            {/* Row 1 */}
            <div className="flex gap-3 items-center">
              <div className="flex flex-col gap-1 w-full">
                <span className="font-semibold">Select Dataset</span>

                <Select
                  isDisabled={true}
                  variant="withoutBorder"
                  placeholder="Select dataset..."
                  name="dataset"
                  items={[]}
                />
              </div>
            </div>

            {/* Row 2 */}

            <div className="w-[calc(100%+1.5rem)] -ml-3 mt-6">
              <Image
                src="/assets/LumbaCheckDataTutorial.svg"
                width={1180}
                height={148}
                className="w-full"
                alt="check data"
              />
            </div>

            {/* Row 3 */}
            <div className="mt-8 pb-4 flex overflow-hidden relative">
              <Step step={3}>
                <StepContent
                  position="left"
                  className="translate-x-36 translate-y-44"
                  executeFunction={{
                    shouldExecuteOnStep: 3,
                    function: () => {
                      const el = document.getElementById("layout");
                      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
                    },
                  }}
                >
                  <StepTitle>Clean Your Dataset</StepTitle>
                  <StepDescription>Choose the cleaning option that you desire then apply.</StepDescription>
                </StepContent>
              </Step>
              <motion.div initial={false} animate={{ width: isOpen ? 280 : 0 }}>
                <AccordionForm isDisabled={true} handleSubmit={(formData, setIsSubmitting) => {}}>
                  <AccordionSelect names={["missing", "missingMode"]} label="Clean Missing Data" top={true}>
                    <p className="pb-1">Columns to be cleaned</p>
                    <Select placeholder="Select column(s)" name="missing" defaultSelected={"all"} items={[]} />
                  </AccordionSelect>
                  <AccordionSelect initialShow={true} names={["duplication"]} label="Remove Duplicate Data">
                    <p className="pb-1">Columns to be cleaned</p>
                    <Select
                      placeholder="Select column(s)"
                      name="duplication"
                      defaultSelected={"all"}
                      items={[
                        {
                          value: "all",
                          label: "All",
                        },
                      ]}
                    />
                  </AccordionSelect>
                  <AccordionSelect names={["outlier", "outlierMode"]} label="Handle Outlier Data">
                    <p className="pb-1">Columns to be cleaned</p>
                    <Select placeholder="Select column(s)" name="outlier" defaultSelected={"all"} items={[]} />
                  </AccordionSelect>
                  <AccordionSelect names={["columnsNormalize", "methodNormalize"]} label="Normalize Data">
                    <p className="pb-1">Columns to be cleaned</p>
                    <Select placeholder="Select column(s)" name="columnsNormalize" defaultSelected={"all"} items={[]} />
                    <p className="pb-1 mt-3">Normalize method</p>
                    <Select placeholder="Select method" name="methodNormalize" items={[]} />
                  </AccordionSelect>
                  <AccordionSelect names={["convertion"]} label="Convert Data Type">
                    <p className="pb-1">Columns to be converted</p>
                    <MultiSelect
                      variant="withBorder"
                      instanceId="select-multiple"
                      placeholder={"Select column(s)"}
                      name="columns"
                      defaultOptions={[]}
                    />
                    <p className="pb-1 mt-3">Convertion</p>
                    <Select
                      placeholder="Select data type"
                      name="targetTypeConvert"
                      items={[
                        { value: "integer", label: "Integer" },
                        { value: "float", label: "Float" },
                        { value: "string", label: "String" },
                      ]}
                    />
                  </AccordionSelect>
                  <AccordionSelect
                    names={["columnsOversampling"]}
                    label="SMOTE"
                    bottom={true}
                    disabled={type === "forecasting"}
                  >
                    <p className="pb-1">Columns to be transformed</p>
                    <Select
                      placeholder="Select a column"
                      name="columnsOversampling"
                      items={[]}
                      disabled={type === "forecasting"}
                    />
                  </AccordionSelect>
                </AccordionForm>
              </motion.div>

              <div className="rounded-r-md shadow bg-white flex-1 min-h-[480px] overflow-auto">
                <div className="h-full flex flex-col w-full">
                  <div className="border-b-[1.5px] border-gray/30 py-3 px-4 flex gap-2 items-center">
                    <button className={`${!isOpen && "rotate-180"}`}>
                      <ChevronDoubleLeft />
                    </button>
                    <h3>Data Clean Result</h3>
                  </div>
                  <div className="flex items-center justify-center flex-1">
                    <span>No Output</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FormModalContextProvider>
      </div>
    </>
  );
};

export default CleaningTutorial3;
