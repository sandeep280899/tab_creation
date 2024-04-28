import React, { useState } from 'react';
import './App.css';
import TabsBar from './TabsBar';

function App() {
    const [tabs, setTabs] = useState([{ id: 1, title: 'New Tab1', url: '', inputUrl: '' }]);
    const [activeTabId, setActiveTabId] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const handleTabClick = (tabId) => {
        setActiveTabId(tabId);
        setErrorMessage('');
    };

    // const handleCloseTab = (tabId) => {
    //     const newTabs = tabs.filter(tab => tab.id !== tabId);
    //     setTabs(newTabs);
    //     if (tabId === activeTabId && newTabs.length > 0) {
    //         setActiveTabId(newTabs[newTabs.length - 1].id);
    //     }
    // };

    const handleCloseTab = (tabId) => {
      const newTabs = tabs.filter(tab => tab.id !== tabId);
      let newActiveTabId = activeTabId;
      if (activeTabId === tabId && newTabs.length > 0) {
          // Find the index of the tab being closed
          const index = tabs.findIndex(tab => tab.id === tabId);
          // If the tab being closed is not the first tab, set the previous tab as active
          if (index > 0) {
              newActiveTabId = tabs[index - 1].id;
          } else { // If the tab being closed is the first tab, set the next tab as active
              newActiveTabId = tabs[1].id;
          }
      }
      setTabs(newTabs);
      setActiveTabId(newActiveTabId);
  };
  


    const handleAddTab = () => {
      let newTabId;
      if (tabs.length === 0) {
          newTabId = 1;
      } else {
          newTabId = Math.max(...tabs.map(tab => tab.id)) + 1;
      }
      const newTabs = [...tabs, { id: newTabId, title: `New Tab ${newTabId}`, url: '', inputUrl: '' }];
      setTabs(newTabs);
      setActiveTabId(newTabId);
      setErrorMessage('');
  };

    const isValidUrl = (url) => {
      // Regular expression for URL validation
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      return urlRegex.test(url);
  };

//   const handleUrlSubmit = (tabId, url) => {
//       if (!url) {
//           setErrorMessage('Please enter the URL');
//           return;
//       }
//       if (!isValidUrl(url)) {
//           setErrorMessage('Please enter a valid URL');
//           return;
//       }
//       const newTabs = tabs.map(tab =>
//           tab.id === tabId ? { ...tab, url } : tab
//       );
//       setTabs(newTabs);
//       setErrorMessage('');
//   };

const handleUrlSubmit = (tabId, url) => {
    if (!url) {
        setErrorMessage('Please enter the URL');
        // Clear the URL of the active tab when there's an error
        const newTabs = tabs.map(tab =>
            tab.id === tabId ? { ...tab, url: '' } : tab
        );
        setTabs(newTabs);
        return;
    }
    if (!isValidUrl(url)) {
        setErrorMessage('Please enter a valid URL');
        // Clear the URL of the active tab when there's an error
        const newTabs = tabs.map(tab =>
            tab.id === tabId ? { ...tab, url: '' } : tab
        );
        setTabs(newTabs);
        return;
    }
    const newTabs = tabs.map(tab =>
        tab.id === tabId ? { ...tab, url } : tab
    );
    setTabs(newTabs);
    setErrorMessage('');
};


    const handleInputChange = (tabId, value) => {
        const newTabs = tabs.map(tab =>
            tab.id === tabId ? { ...tab, inputUrl: value } : tab
        );
        setTabs(newTabs);
        setErrorMessage('');
    };

    return (
        <div className="app">
            <TabsBar
                tabs={tabs}
                activeTabId={activeTabId}
                onTabClick={handleTabClick}
                onCloseTab={handleCloseTab}
                onAddTab={handleAddTab}
            />
            <div className="tab-content">
                {tabs.map(tab => (
                    <div key={tab.id} className={`tab-pane ${tab.id === activeTabId ? 'active' : ''}`}>
                        {tab.id === activeTabId && ( // Only render input field and Go button if tab is active
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                handleUrlSubmit(tab.id, tab.inputUrl);
                            }}>
                                <input
                                    type="text"
                                    value={tab.inputUrl}
                                    onChange={(e) => handleInputChange(tab.id, e.target.value)}
                                    placeholder="Enter URL"
                                />
                                <button type="submit">Submit</button>
                                {errorMessage && <p className="error">{errorMessage}</p>} 
                            </form>
                        )}
                        {tab.id === activeTabId && ( // Only render iframe content if tab is active
                            <iframe title={`tab-content-${tab.id}`} src={tab.url} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
