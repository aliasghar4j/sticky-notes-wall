import React from 'react'
import { Layout } from 'antd'
const {Sider} = Layout;

export default function Siderbar() {
  return (
    <>
    <Sider theme='light' className='side-pannel col-2 rounded p-3 me-3 d-flex flex-column'>
                    {/* <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target=".side-pannel" aria-expanded="false" aria-controls="collapseWidthExample">
                        Toggle
                    </button> */}
                    <a class="navbar-brand mb-3" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".side-pannel" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <input class="form-control me-2 mb-3" type="search" placeholder="Search" aria-label="Search"></input>
                    <h4 className='mb-2'>Tasks</h4>
                    <ul>
                    <li>
                    <a class="navbar-brand" href="#">Upcomming</a>
                    </li>
                    <li>
                    <a class="navbar-brand" href="#">Today</a>
                    </li>
                    <li>
                    <a class="navbar-brand" href="#">Calendar</a>
                    </li>
                    <li>
                    <a class="navbar-brand" href="#">Sticky Wall </a>
                    </li>   
                    </ul>
                    <hr />
                    <h4>Lists</h4>
                    <li>
                    <a class="navbar-brand" href="#">Personal </a>
                    </li>

                </Sider>
    </>
  )
}
