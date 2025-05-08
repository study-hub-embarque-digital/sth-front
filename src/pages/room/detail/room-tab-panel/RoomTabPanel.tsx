import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { TabContainer } from "./styles";

interface IRoomTabPanel {
  tabItems: ITabItems[]
}

interface ITabItems {
  title: string,
  element: React.ReactNode,
  index: number
}

const RoomTabPanel = ({ tabItems }: IRoomTabPanel) => {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <TabContainer centered value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
        {tabItems.toSorted((a, b) => a.index - b.index).map(tabItem => {
          return <Tab key={tabItem.index} label={tabItem.title} />
        })}
      </TabContainer>

      {tabItems.map(item => {
        return item.index === tabIndex && <div key={item.index}>{item.element}</div>
      })}
    </Box>
  );
}

export { RoomTabPanel };