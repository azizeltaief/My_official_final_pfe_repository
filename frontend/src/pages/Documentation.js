/*import React, { useEffect } from 'react';
import githubEmbed from 'github-embed';
import 'babel-polyfill'; // Import the polyfill if not already included elsewhere in your project

const Documentation = () => {
  useEffect(() => {
    githubEmbed('.element', {
      "owner": "azizeltaief", //"your-github-username"
      "repo": "PFE",       //"your-repository-name"
      "ref": "main",   //"master"
      "embed": [
        {
          "type": "htmlpage",
          "label": "Embedded Wiki Page",
          "url": "https://github.com/azizeltaief/PFE/wiki/Home"   //"https://github.com/your-github-username/your-repository-name/wiki/Your-Wiki-Page"
        }
      ]
    });
  }, []);

  return (
    <div className="element">
      {/* This is where your embedded GitHub wiki page will be displayed *//*}
    </div>
  );
};*/

//export default Documentation;




/*import React, { useState, useEffect } from 'react';

const Documentation = ({ username, repository, page }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchWikiPage = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/wiki/azizeltaief/PFE/Home.md`
        );
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          throw new Error('Failed to fetch wiki page');
        }
      } catch (error) {
        console.error('Error fetching wiki page:', error);
      }
    };

    fetchWikiPage();
  }, [username, repository, page]);

  return (
    <div>
      {/* Render the fetched wiki page content *//*}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default Documentation;*/

/**********import React, { useState, useEffect } from 'react';

const Documentation = ({ username, repository }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWikiPages = async () => {
      const pageNames = ['Home', 'second']; // Define the list of page names
      const pagesData = [];

      for (const pageName of pageNames) {
        try {
          const response = await fetch(
            `https://raw.githubusercontent.com/wiki/azizeltaief/PFE/${pageName}.md?cacheBuster=${new Date().getTime()}`
          );
          if (response.ok) {
            const text = await response.text();
            pagesData.push({ name: pageName, content: text });
          } else {
            console.error(`Failed to fetch wiki page: ${pageName}`);
          }
        } catch (error) {
          console.error('Error fetching wiki page:', error);
        }
      }

      setPages(pagesData);
      setLoading(false);
    };


    fetchWikiPages();
  }, [username, repository]);


  
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pages.map((page) => (
          <div key={page.name}>
            <h2>{page.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ))
      )}
    </div>
  );
};

export default Documentation;*******/

/**************import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';


const Documentation = ({ username, repository }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [markdownContent, setMarkdownContent] = useState('');


  const fetchWikiPages = async () => {
    setLoading(true);

    const pageNames = ['Home', 'second'];
    const pagesData = [];

    for (const pageName of pageNames) {
      try {
        const randomParam = `nocache=${Math.random()}`;
        const timestamp = new Date().getTime(); // Get current timestamp
        const url = `https://raw.githubusercontent.com/wiki/azizeltaief/PFE/${pageName}.md?timestamp=${timestamp}?${randomParam}`;
        console.log('Fetching:', url);
        const response = await fetch(url,    {
          cache: 'no-store', // Disable caching on the client side
        });
        if (response.ok) {
          const text = await response.text();
          pagesData.push({ name: pageName, content: text });
          console.log('Fetched data for', pageName);
          console.log('text data for', text);

        } else {
          console.error(`Failed to fetch wiki page: ${pageName}`);
        }
      } catch (error) {
        console.error('Error fetching wiki page:', error);
      }
    }

    setPages(pagesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWikiPages();
  }, [username, repository]);

  const handleRefresh = () => {
    fetchWikiPages();
  };

  console.log('Current pages:', pages); // Log current pages state for debugging

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pages.map((page) => (
          <div key={page.name}>
            <h2>{page.name}</h2>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </div>
        ))
      )}
    </div>
  );
};

export default Documentation;**********/

/*********official
 * import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const Documentation = ({ username, repository }) => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWikiPages = async () => {
    setLoading(true);

    const pageNames = ['Home', 'second'];
    const pagesData = [];

    for (const pageName of pageNames) {
      try {
        const randomParam = `nocache=${Math.random()}`;
        const timestamp = new Date().getTime(); // Get current timestamp
        const url = `https://raw.githubusercontent.com/wiki/azizeltaief/PFE/${pageName}.md?timestamp=${timestamp}?${randomParam}`;
        console.log('Fetching:', url);
        const response = await fetch(url, {
          cache: 'no-store', // Disable caching on the client side
        });
        if (response.ok) {
          const text = await response.text();
          pagesData.push({ name: pageName, content: text });
          console.log('Fetched data for', pageName);
          console.log('text data for', text);
        } else {
          console.error(`Failed to fetch wiki page: ${pageName}`);
        }
      } catch (error) {
        console.error('Error fetching wiki page:', error);
      }
    }

    setPages(pagesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchWikiPages();
  }, [username, repository]);

  const handleRefresh = () => {
    fetchWikiPages();
  };

  console.log('Current pages:', pages); // Log current pages state for debugging

  return (
    <div>
      <button onClick={handleRefresh}>Refresh</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        pages.map((page) => (
          <div key={page.name}>
            <h2>{page.name}</h2>
            <ReactMarkdown>{page.content}</ReactMarkdown>
          </div>
        ))
      )}
    </div>
  );
};

export default Documentation;************/

import react from 'react'

const Documentation = ({ username, repository }) => {

  return (
    <>
    Documentatioazxan1erfe11eeeaa
    </>
  )
}

export default Documentation;