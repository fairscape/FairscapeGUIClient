import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CommandForm from "./CommandForm";
import OutputBoxComponent from "./OutputBox";
import {
  MainContent,
  SmallerCol,
  LargerCol,
  SidebarItem,
} from "./StyledComponents";

function MainContentComponent({
  commands,
  selectedCommand,
  selectedSubCommand,
  selectedSubSubCommand,
  options,
  output,
  rocratePath,
  schemaFile,
  handleSubCommandSelect,
  handleSubSubCommandSelect,
  handleOptionChange,
  handleRocratePathChange,
  handleSchemaFileChange,
  handleSubmit,
  handleUpload,
  isExecuteDisabled,
  previousPaths,
  onSuccessfulExecution,
  onAddAnother,
}) {
  const getDescription = () => {
    if (selectedCommand && commands[selectedCommand]) {
      const commandObj = commands[selectedCommand];
      if (selectedSubCommand && commandObj[selectedSubCommand]) {
        const subCommandObj = commandObj[selectedSubCommand];
        if (selectedSubSubCommand && subCommandObj[selectedSubSubCommand]) {
          return (
            subCommandObj[selectedSubSubCommand].description ||
            "No description available."
          );
        }
        return subCommandObj.description || "No description available.";
      }
      return commandObj.description || "No description available.";
    }
    return "Please select a command to see its description.";
  };

  const getOptionsWithoutDescription = (obj) => {
    return Object.keys(obj).filter((key) => key !== "description");
  };

  return (
    <Container
      fluid
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {selectedCommand && (
        <Row>
          <Col>
            <h4>{selectedCommand}</h4>
            <p>{getDescription()}</p>
          </Col>
        </Row>
      )}
      <Row style={{ flexGrow: 1, minHeight: 0 }}>
        <SmallerCol>
          {selectedCommand && (
            <div>
              <h5 style={{ marginBottom: "15px" }}>Subcommands</h5>
              {getOptionsWithoutDescription(commands[selectedCommand]).map(
                (subCommand) => (
                  <SidebarItem
                    key={subCommand}
                    active={selectedSubCommand === subCommand}
                    onClick={() => handleSubCommandSelect(subCommand)}
                  >
                    {subCommand}
                  </SidebarItem>
                )
              )}
            </div>
          )}
        </SmallerCol>
        <SmallerCol>
          {selectedSubCommand &&
            commands[selectedCommand][selectedSubCommand] &&
            typeof commands[selectedCommand][selectedSubCommand] ===
              "object" && (
              <div>
                <h5 style={{ marginBottom: "15px" }}>Options</h5>
                {getOptionsWithoutDescription(
                  commands[selectedCommand][selectedSubCommand]
                ).map((subSubCommand) => (
                  <SidebarItem
                    key={subSubCommand}
                    active={selectedSubSubCommand === subSubCommand}
                    onClick={() => handleSubSubCommandSelect(subSubCommand)}
                  >
                    {subSubCommand}
                  </SidebarItem>
                ))}
              </div>
            )}
        </SmallerCol>
        <LargerCol>
          <CommandForm
            commands={commands}
            selectedCommand={selectedCommand}
            selectedSubCommand={selectedSubCommand}
            selectedSubSubCommand={selectedSubSubCommand}
            options={options}
            rocratePath={rocratePath}
            schemaFile={schemaFile}
            handleOptionChange={handleOptionChange}
            handleRocratePathChange={handleRocratePathChange}
            handleSchemaFileChange={handleSchemaFileChange}
            handleSubmit={handleSubmit}
            handleUpload={handleUpload}
            isExecuteDisabled={isExecuteDisabled}
            previousPaths={previousPaths}
            onSuccessfulExecution={onSuccessfulExecution}
            onAddAnother={onAddAnother}
          />
        </LargerCol>
      </Row>
      <Row>
        <Col>
          <OutputBoxComponent output={output} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainContentComponent;
