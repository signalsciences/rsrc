/* eslint-disable import/no-unresolved */

import React from "react";
import ReactDOM from "react-dom";
import { Cache, Resource } from "rsrc";

const GithubOrg = ({ org, children }) => {
  return (
    <Resource path={`https://api.github.com/orgs/${org}`}>{children}</Resource>
  );
};

const GithubOrgDetail = ({ org }) => (
  <div>
    <h1>{org.name}</h1>
    <img width={48} alt={org.login} src={org.avatar_url} />
    <p>{org.description}</p>
    <a href={`https://github.com/orgs/${org.login}`}>
      Visit {org.login} on Github
    </a>
  </div>
);

function App() {
  return (
    <GithubOrg org="reactjs">
      {rsrc =>
        rsrc.state.fulfilled ? <GithubOrgDetail org={rsrc.state.value} /> : null
      }
    </GithubOrg>
  );
}

const Root = () => (
  <Cache>
    <App />
  </Cache>
);

ReactDOM.render(<Root />, document.getElementById("root"));
