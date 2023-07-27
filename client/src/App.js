//import "./App.css";
import css from "./App.module.css";
import Part from "./components/part/Part";

function App() {
  const myFetch = async (url, method, body = null, headers = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body);
        headers["Content-Type"] = "application/json";
      }

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

    let body = {};
    Array.from(e.target.elements)
      .filter((i) => i.type !== "submit")
      .forEach((e) => {
        body[e.name] = e.value;
      });

    if (method === "GET" && body.id) {
      url += "?id=" + body.id;
    }

    myFetch(url, method, (body = method === "GET" ? null : body));
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
    </div>
  );
}

export default App;
