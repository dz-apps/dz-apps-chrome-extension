import { useEffect, useState } from "preact/hooks";
import dzLogo from "./assets/logo.png";
import "./app.css";

import * as Preact from "preact";
import { APP_NAME, LSKey } from "./constants";

type AppMap = { [key: string]: boolean };

const defaultAppMap: AppMap = {
  "d-musk-ify": false,
  "d-polarize": false,
};

export function App() {
  const [appList, setAppList] = useState<AppMap>({});

  useEffect(() => {
    const LSOptions = window.localStorage.getItem(LSKey);
    if (LSOptions) {
      setAppList(JSON.parse(LSOptions));
    } else {
      setAppList(defaultAppMap);
    }
  }, []);

  const toggle = (optionName: string) => {
    if (optionName) {
      const newMap = { ...appList, [optionName]: !appList[optionName] };
      setAppList(newMap);

      window.localStorage.setItem(LSKey, JSON.stringify(newMap));
    }
  };

  return (
    <>
      <div>
        <a
          href="https://github.com/dz-apps/dz-apps-chrome-extension"
          target="_blank"
        >
          <img src={dzLogo} class="logo preact" alt="Dz Apps logo" />
        </a>
      </div>
      <h1>{APP_NAME}</h1>
      <div class="card">
        {Object.entries(appList).map(([key, value]) => (
          <div style={{ display: "block" }}>
            <input
              type="checkbox"
              id={key}
              name={key}
              value={key}
              checked={!!value}
              onChange={(event) =>
                toggle((event?.target as HTMLInputElement)?.name)
              }
            />
            <label for={key}> {key}</label>
          </div>
        ))}
      </div>

      <div class="card">
        <button onClick={() => window.location.reload()}>
          Reload Web Page
        </button>
      </div>
    </>
  );
}
