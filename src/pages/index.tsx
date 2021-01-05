import React from 'react';

function Home() {
  function getData() {
    return (
      fetch(`/api/getData`, {
        method: `GET`,
        headers: {
          'Content-Type': `text/csv`,
        },
      })
        // .then((r) => r.json())
        .then((response) => response.blob())
        .then((blob) => {
          // Create blob link to download
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement(`a`);
          link.href = url;
          link.setAttribute(`download`, `FileName.csv`);

          // Append to html link element page
          document.body.appendChild(link);

          // Start download
          link.click();

          // Clean up and remove the link
          link.parentNode.removeChild(link);
          // console.log(e);
        })
    );
  }

  function getLongData() {
    return fetch(`/api/getDataLongFormat`, {
      // method: `GET`,
      // headers: {
      //   'Content-Type': `text/csv`,
      // },
    })
      .then((r) => r.json())
      .then((e) => console.log(e));
    // .then((response) => response.blob())
    // .then((blob) => {
    //   // Create blob link to download
    //   const url = window.URL.createObjectURL(new Blob([blob]));
    //   const link = document.createElement(`a`);
    //   link.href = url;
    //   link.setAttribute(`download`, `FileName.csv`);

    //   // Append to html link element page
    //   document.body.appendChild(link);

    //   // Start download
    //   link.click();

    //   // Clean up and remove the link
    //   link.parentNode.removeChild(link);
    //   // console.log(e);
    // })
  }

  return (
    <div>
      <button type="button" onClick={getData}>
        Click
      </button>
      <button type="button" onClick={getLongData}>
        Click
      </button>
    </div>
  );
}
// const Home: React.FC = () => (
//   <div className="container">
//     <Head>
//       <title>Create Next App</title>
//       <link rel="icon" href="/favicon.ico" />
//     </Head>

//     <main>
//       <Title />
//       <p>Something else</p>
//     </main>
//   </div>
// );

export default Home;
