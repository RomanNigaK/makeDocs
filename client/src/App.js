//import "./App.css";
import css from "./App.module.css";
import Part from "./components/part/Part";

function App() {
  const myFetch = async (url, method, body = null, headers = {}) => {
    try {
      // if (body) {
      //   body = JSON.stringify(body);
      //   headers["Content-Type"] = "application/json";
      // }

      const response = await fetch(url, {
        method,
        body,
        headers,
      });

      const { data, error } = await response.json();
      if (!response.ok) {
        throw new Error(error || "Error server");
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e, url, method) => {
    e.preventDefault();

    const isFile = Array.from(e.target.elements).find((i) => i.type === "file");

    let headers = {};
    let body;

    if (isFile) {
      body = new FormData();
      Array.from(e.target.elements)
        .filter((i) => i.type !== "submit")
        .forEach((e) => {
          //console.log(e.name);
          //console.log(e.name);
          if (e.type === "file") {
            body.append(e.name, e.files[0] || "");
          } else {
            body.append(e.name, e.value);
            //body[e.name] = e.value;
          }
        });
    } else {
      body = {};
      Array.from(e.target.elements)
        .filter((i) => i.type !== "submit")
        .forEach((e) => {
          if (e.type === "file") {
            body[e.name] = e.files[0] || "";
          } else {
            body[e.name] = e.value;
          }
        });

      if (method === "GET" && body.id) {
        url += "?id=" + body.id;
      } else {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }
    }

    myFetch(url, method, (body = method === "GET" ? null : body), headers);
  };

  return (
    <div className="App">
      <h3>Документация REST API</h3>
      <Part name="Project">
        <div className={css.title}>
          <ul>
            <li>/api/project</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>name: string</div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, dataCreated: number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/project", "POST")}>
                <input type="text" placeholder="Name project" name="name" />
                <input type="submit" value="Create" />
              </form>
            </div>
            <li>/api/project</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, dataCreated: number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/project/", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            <li>/api/project</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/project", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            <li>/api/project</li>
            method:PUT
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number,name?:string,</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/project/", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="Name project" name="name" />
                <input type="submit" value="update" />
              </form>
            </div>
            <li>/api/project</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, dataCreated: number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/project/", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
          </ul>
        </div>
      </Part>

      <Part name="Design">
        <div className={css.title}>
          <ul>
            <li>/api/design</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, designCode:string
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, designCode:string,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/design", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="designCode" name="designCode" />
                <input type="submit" value="Create" />
              </form>
            </div>
            <li>/api/design</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string,designCode:string, dataCreated:
                      number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/design", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* DELETE */}
            <li>/api/design</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/design", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/design</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number,name?:string, designCode?:string
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/design", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="Name project" name="name" />
                <input type="text" placeholder="designCode" name="designCode" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/design</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, designCode:string, dataCreated:
                      number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/design", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Standard">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/standard</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>name: string, code:string</div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, code:string, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/standard", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="designCode" name="code" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/standard</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string,code:string, dataCreated: number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/standard", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/standard</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
                <div>
                  string: <b>data</b>=&gt;"this standards use table workStage"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/standard", "DELETE")}
              >
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/standard</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number,name?:string, code?:string
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/standard", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="Name project" name="name" />
                <input type="text" placeholder="designCode" name="designCode" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/standard</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, code:string, dataCreated: number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/standard", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Workarea">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/workarea</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, axis:string, highLevel:string
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, axis:string, highLevel:string,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workarea", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="axis" name="axis" />
                <input type="text" placeholder="highLevel" name="highLevel" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/workarea</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, axis:string, highLevel:string,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workarea", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/workarea</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/workarea", "DELETE")}
              >
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/standard</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, axis?:string, highLevel?:string,
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workarea", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="axis" name="axis" />
                <input type="text" placeholder="highLevel" name="highLevel" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/workarea</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, axis:string, highLevel:string,
                      dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workarea", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Workstage">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/workstage</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>name: string, standards:number</div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, standards:number,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                  string: <b>data</b>=&gt;"not id in standards table"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workstage", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="idStandards" name="standards" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/standard</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, standards:number,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workstage", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/workstage</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/workstage", "DELETE")}
              >
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/workstage</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number,name?:string, standards:number
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
                <div>
                  string: <b>data</b>=&gt;"not id in standards table"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workstage", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="idStandards" name="standards" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/workstage</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, standards:number, dataCreated:
                      number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/workstage", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Material">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/material</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, qualityDocs:number, workStages:number
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, qualityDocs:number,
                      workStages:number, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/material", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input
                  type="text"
                  placeholder="qualityDocs"
                  name="qualityDocs"
                />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/material</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, qualityDocs:number,
                      workStages:number, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/material", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/material</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/material", "DELETE")}
              >
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/standard</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, qualityDocs?:number,
                  workStages?:number
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/material", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input
                  type="text"
                  placeholder="qualityDocs"
                  name="qualityDocs"
                />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/workarea</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, qualityDocs:number,
                      workStages:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/material", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Act">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/act</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, number:string, date:number, workAreas:number,
                  workStages:number, spType:string
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:number,
                      workAreas:number, workStages:number, spType:string,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/act", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="spType" name="spType" />

                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/act</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:number,
                      workAreas:number, workStages:number, spType:string,
                      dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/act", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/act</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/act", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/act</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, number?:string, date?:number,
                  workAreas?:number, workStages?:number, spType?:string
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/act", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="spType" name="spType" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/act</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:number,
                      workAreas:number, workStages:number, spType:string,
                      dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/act", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="QualityDoc">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/qualitydoc</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, beginDate:number,
                  endDate:number,pageCount:number, file:file
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, beginDate:number,
                      endDate:number,pageCount:number, file:string
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/qualitydoc", "POST")}
              >
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="beginDate" name="beginDate" />
                <input type="text" placeholder="endDate" name="endDate" />
                <input type="text" placeholder="pageCount" name="pageCount" />
                <input type="file" placeholder="file" name="file" />

                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/qualitydoc</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, beginDate:number,
                      endDate:number,pageCount:number, file:string
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/qualitydoc", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/qualitydoc</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form
                onSubmit={(e) => handleSubmit(e, "/api/qualitydoc", "DELETE")}
              >
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/qualitydoc</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, beginDate?:number,
                  endDate?:number,pageCount?:number, file?:string
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/qualitydoc", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="beginDate" name="beginDate" />
                <input type="text" placeholder="endDate" name="endDate" />
                <input type="text" placeholder="pageCount" name="pageCount" />
                <input type="file" placeholder="file" name="file" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/qualitydoc</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name?: string, beginDate?:number,
                      endDate?:number,pageCount?:number, file?:string
                      dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/qualitydoc", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Drawing">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/drawing</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, number:number, date:integer, workAreas:number,
                  workStages:number, acts:number, pageCount:number, file:file
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      pageCount:number, file:string, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/drawing", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="acts" name="acts" />
                <input type="text" placeholder="pageCount" name="pageCount" />
                <input type="file" placeholder="file" name="file" />

                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/drawing</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      pageCount:number, file:string, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/drawing", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/drawing</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/drawing", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/drawing</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, number?:string, date?:integer,
                  workAreas?:number, workStages?:number, acts?:number,
                  pageCount?:number, file?:File
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/drawing", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="acts" name="acts" />
                <input type="text" placeholder="pageCount" name="pageCount" />
                <input type="file" placeholder="file" name="file" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/drawing</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      pageCount:number, file:string, dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/drawing", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Lab">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/lab</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  name: string, number:string, date:integer, workAreas:number,
                  workStages:number, acts:number, file:file
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      file:string, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/lab", "POST")}>
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="acts" name="acts" />
                <input type="file" placeholder="file" name="file" />

                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/lab</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      file:string, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/lab", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/lab</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/lab", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/lab</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, name?: string, number?:string, date?:integer,
                  workAreas?:number, workStages?:number, acts?:number,
                  file?:File
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/lab", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="name" name="name" />
                <input type="text" placeholder="number" name="number" />
                <input type="text" placeholder="date" name="date" />
                <input type="text" placeholder="workAreas" name="workAreas" />
                <input type="text" placeholder="workStages" name="workStages" />
                <input type="text" placeholder="acts" name="acts" />
                <input type="file" placeholder="file" name="file" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/lab</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, name: string, number:string, date:integer,
                      workAreas:number, workStages:number, acts:number,
                      file:string, dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/lab", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Member">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/member</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  position string, fio string, orderDoc:string,sroNumber string,
                  role string, company number,
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, position string, fio string, sroNumber string,
                      role string, company number, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/member", "POST")}>
                <input type="text" placeholder="position" name="position" />
                <input type="text" placeholder="fio" name="fio" />
                <input type="text" placeholder="orderDoc" name="orderDoc" />
                <input type="text" placeholder="sroNumber" name="sroNumber" />
                <input type="text" placeholder="role" name="role" />
                <input type="text" placeholder="company" name="company" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/member</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, position string, fio string, sroNumber string,
                      role string, company number, dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/member", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/member</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/member", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/member</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, position?:string, fio?:string, sroNumber?:string,
                  role?:string, company?:number
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/member", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="position" name="position" />
                <input type="text" placeholder="fio" name="fio" />
                <input type="text" placeholder="orderDoc" name="orderDoc" />
                <input type="text" placeholder="sroNumber" name="sroNumber" />
                <input type="text" placeholder="role" name="role" />
                <input type="text" placeholder="company" name="company" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/member</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, position:string, fio:string, sroNumber:string,
                      role:string, company:number dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/member", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>

      <Part name="Company">
        <div className={css.title}>
          <ul>
            {/* POST */}
            <li>/api/company</li>
            method:POST
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  fullName:string, shortName:string, address:string, inn:number,
                  ogrn:number, sroName:string, sroAddress:string, sroInn:number,
                  sroOgrn:number, role:string
                </div>
                &#125;
              </div>

              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, fullName:string, shortName:string,
                      address:string, inn:number, ogrn:number, sroName:string,
                      sroAddress:string, sroInn:number, sroOgrn:number,
                      role:string,dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/company", "POST")}>
                <input type="text" placeholder="fullName" name="fullName" />
                <input type="text" placeholder="shortName" name="shortName" />
                <input type="text" placeholder="address" name="address" />
                <input type="text" placeholder="inn" name="inn" />
                <input type="text" placeholder="ogrn" name="ogrn" />
                <input type="text" placeholder="sroName" name="sroName" />
                <input type="text" placeholder="sroInn" name="sroInn" />
                <input type="text" placeholder="sroOgrn" name="sroOgrn" />
                <input type="text" placeholder="role" name="role" />
                <input type="submit" value="Create" />
              </form>
            </div>
            {/* END POST */}
            {/* GET */}
            <li>/api/company</li>
            method:GET
            <ul>
              <li>request</li>
              <div className={css.object}>
                <div className={css.values}>?id: number</div>
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>data</b>
                  <div className={css.object}>
                    &#123;
                    <div className={css.values}>
                      id: number, fullName:string, shortName:string,
                      address:string, inn:number, ogrn:number, sroName:string,
                      sroAddress:string, sroInn:number, sroOgrn:number,
                      role:string,dataCreated:number
                    </div>
                    &#125;
                  </div>
                </div>
                <div>
                  string: <b>data</b>=&gt;"not found"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/company", "GET")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="getById" />
              </form>
            </div>
            {/* END GET */}
            {/* DELETE */}
            <li>/api/company</li>
            method:DELETE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>id: number</div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"deleted"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/company", "DELETE")}>
                <input type="text" placeholder="id" name="id" />
                <input type="submit" value="deleteById" />
              </form>
            </div>
            {/*END DELETE */}
            {/* PUT */}
            <li>/api/company</li>
            method:UPDATE
            <ul>
              <li>request</li>
              <div className={css.object}>
                &#123;
                <div className={css.values}>
                  id: number, fullName?:string, shortName?:string,
                  address?:string, inn?:number, ogrn?:number, sroName?:string,
                  sroAddress?:string, sroInn?:number, sroOgrn?:number,
                  role?:string
                </div>
                &#125;
              </div>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>

                <div>
                  string: <b>data</b>=&gt;"updated"
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/company", "PUT")}>
                <input type="text" placeholder="id" name="id" />
                <input type="text" placeholder="fullName" name="fullName" />
                <input type="text" placeholder="shortName" name="shortName" />
                <input type="text" placeholder="address" name="address" />
                <input type="text" placeholder="inn" name="inn" />
                <input type="text" placeholder="ogrn" name="ogrn" />
                <input type="text" placeholder="sroName" name="sroName" />
                <input type="text" placeholder="sroInn" name="sroInn" />
                <input type="text" placeholder="sroOgrn" name="sroOgrn" />
                <input type="text" placeholder="role" name="role" />
                <input type="submit" value="update" />
              </form>
            </div>
            {/* END PUT */}
            {/* GET all */}
            <li>/api/company</li>
            method:GET
            <ul>
              <li>response</li>
              <ul>
                <li>error</li>
                <div>error:string</div>
                <li>ok</li>
                <div>
                  object: <b>Array:data</b>
                  <div className={css.object}>
                    &#91;&#123;
                    <div className={css.values}>
                      id: number, fullName:string, shortName:string,
                      address:string, inn:number, ogrn:number, sroName:string,
                      sroAddress:string, sroInn:number, sroOgrn:number,
                      role:string, dataCreated:number
                    </div>
                    &#125;,&#93;
                  </div>
                </div>
              </ul>
            </ul>
            <div className={css.test}>
              <form onSubmit={(e) => handleSubmit(e, "/api/company", "GET")}>
                <input type="submit" value="getAll" />
              </form>
            </div>
            {/* END GET all */}
          </ul>
        </div>
      </Part>
    </div>
  );
}

export default App;
