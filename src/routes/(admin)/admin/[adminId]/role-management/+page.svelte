<script>
  import Icon from '@iconify/svelte';
  // @ts-ignore
  import Model from '/src/components/Model.svelte';
    // สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
    /** @type {string[]} */
    export let colLabels = ['#', 'ชื่อบทบาท' ,' ', 'เมนูที่เข้าถึงได้','','','','title'];
  
    // สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
    /** @type {string[][]} */
    export let rowRecords = [
      ['ผู้ดูแลระบบ','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['ผ่ายบุคคล','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['พนักงานบัญชี','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['คนงาน','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['ผู้จัดการ','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['ผู้ดูแลระบบ','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['ผ่ายบุคคล','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['พนักงานบัญชี','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['คนงาน','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
      ['ผู้จัดการ','','แดชบอร์ด,บทบาท,ผู้ดูแลระบบ,สมาชิก,Log','','',''],
    ];
  
    const editRow = (index) => {
      alert(`Edit row ${index + 1}`);
    };
  
    const deleteRow = (index) => {
      alert(`Delete row ${index + 1}`);
    };
  
    function badgeStatus(status) {
      return status[0] === 'ใช้งาน' ? 'badge bg-success' : 'badge bg-danger';
    }
   </script>
  
  <div class="w-100  min-vh-100 bg-white ">
      <div class="d-flex">
      <div class="w-100 bg-white ">
          <div class="w-100 bg-white  d-flex justify-content-between align-items-center px-3 py-2">
              <span style="font-size: 30px;">สิทธิ์ผู้ใช้งาน</span>
              <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      เพิ่มสิทธิ์ผู้ใช้งาน
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">สิทธิ์ผู้ใช้งาน</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
              <div class="mb-3 row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">ชื่อสิทธิ์ : </label>
                  <div class="col-sm-10">
                    <input type="text" placeholder="placeholder" class="form-control" id="inputPassword">
                  </div>
                </div>
                <table class="table">
                  <thead>
                    <tr class="table-primary">
                      <th scope="col">รายการ</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col">เข้าถึงเมนู</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>หน้าแรก</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="firstpagecheckbox">
                        </div>
                      </td>
                    </tr>
                    
                    <tr>
                      <td>สิทธิ์ผู้ใช้งาน</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="authencheckbox">
                        </div>
                      </td>
                  
                    </tr>
                    <tr>
                      <td>ผู้ดูแลระบบ</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="managementcheckbox">
                        </div>
                      </td>
                  
                    </tr>
                    <tr>
                      <td>ร้านค้า</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="stroecheckbox">
                        </div>
                      </td>
                  
                    </tr>
                    <tr>
                      <td>ลูกค้า</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="customercheck">
                        </div>
                      </td>
                  
                    </tr>
                    <tr>
                      <td>log</td>
                      <td></td>
                      <td></td>
                      <td>
                          <div class="form-check  d-flex" style="margin-left: 20px;" >
                          <input class="form-check-input" type="checkbox" value="" id="logcheckbox">
                        </div>
                      </td>
                  
                    </tr>
                  </tbody>
                </table>
  
  
  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">บันทึก</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
          </div>
          
        </div>
      </div>
    </div>
          </div>
      <div class="w-100 bg-white  d-flex justify-content-between align-items-center px-3 py-2">
        <form class="row g-3">
          <div class="col-auto">
            <input type="text" class="form-control" id="inputSearch" placeholder="Search">
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-primary mb-3">ค้นหา</button>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-primary mb-3">ล้างการค้นหา</button>
          </div>
        </form>
      </div>
      <!--table--> 

      <table class="table text-center table-striped">
        <thead class="table-c-primary">
          <tr>
            {#each colLabels as c}
              <th class="text-light px-4 bg-primary" scope="col">{c}</th>
            {/each}
          </tr>
        </thead>
        <tbody>
          {#each rowRecords as record, index}
            <tr>
              <td>{index}</td>
              {#each record.slice(0, -1) as cell}
                <td>{cell}</td>
              {/each}
              <!--- สำหรับใช้กับ "สถานะ" ไม่ส่วนนี้ลบทึ้ง -->
              <td>
                <span class={record.slice(-1)}>{record.slice(-1)}</span>
              </td>
              <td class="table-actions">
                <button
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-editor-${index}`}
                  class="btn btn-outline-warning btn-sm"
                  ><Icon width="16" icon="material-symbols:edit-square-outline" /></button
                >
                <Model modalTargetId={`modal-editor-${index}`} modalTitle={'แก้ไขข้อมูล'}>
                  <div class="modal-body">
                    <div class="mb-3 row">
                        <label for="inputPassword" class="col-sm-2 col-form-label">ชื่อสิทธิ์ : </label>
                        <div class="col-sm-10">
                          <input type="text" placeholder="placeholder" class="form-control" id="inputPassword">
                        </div>
                      </div>
                      <table class="table">
                        <thead>
                          <tr class="table-primary">
                            <th scope="col">รายการ</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">เข้าถึงเมนู</th>
                            
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="display: flex; justify-content:center">หน้าแรก</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="firstpagecheckbox">
                              </div>
                            </td>
                          </tr>
                          
                          <tr>
                            <td style="display: flex; justify-content:center">สิทธิ์ผู้ใช้งาน</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="authencheckbox">
                              </div>
                            </td>
                        
                          </tr>
                          <tr>
                            <td style="display: flex; justify-content:center">ผู้ดูแลระบบ</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="managementcheckbox">
                              </div>
                            </td>
                        
                          </tr>
                          <tr>
                            <td style="display: flex; justify-content:center">ร้านค้า</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="stroecheckbox">
                              </div>
                            </td>
                        
                          </tr>
                          <tr>
                            <td style="display: flex; justify-content:center">ลูกค้า</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="customercheck">
                              </div>
                            </td>
                        
                          </tr>
                          <tr>
                            <td style="display: flex; justify-content:center">log</td>
                            <td></td>
                            <td></td>
                            <td>
                                <div class="form-check  d-flex" style="justify-content:center" >
                                <input class="form-check-input" type="checkbox" value="" id="logcheckbox">
                              </div>
                            </td>
                        
                          </tr>
                        </tbody>
                      </table>
        
        
        
                </div>
                <div class="modal-footer">
                  <button type="submit" class="btn btn-primary">บันทึก</button>
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  
                </div>
      
                </Model>
      
                <button
                  data-bs-toggle="modal"
                  data-bs-target={`#modal-delete-${index}`}
                  class="btn btn-outline-danger btn-sm"
                >
                  <Icon width="16" icon="material-symbols:delete" />
                </button>
      
                <Model modalTargetId={`modal-delete-${index}`} modalTitle={'ลบข้อมูล'} >
                  <div class="mb-3 row">
                    <p>คุณต้องการลบใช่หรือไม่</p>
                  </div>
                  <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">ยืนยัน</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </Model>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups" style="display: flex; justify-content:flex-end">
        <div class="btn-group me-2" role="group" aria-label="First group" >
          <button type="button" class="btn btn-outline-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
              <path fill="#0d6efd" d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12z" />
            </svg>
          </button>
          <button type="button" class="btn btn-outline-primary">1</button>
          <button type="button" class="btn btn-outline-primary">2</button>
          <button type="button" class="btn btn-outline-primary">3</button>
          <button type="button" class="btn btn-outline-primary">4</button>
          <button type="button" class="btn btn-outline-primary">5</button>
          <button type="button" class="btn btn-outline-primary">6</button>
          <button type="button" class="btn btn-outline-primary">7</button>
          <button type="button" class="btn btn-outline-primary">8</button>
          <button type="button" class="btn btn-outline-primary">9</button>
          <button type="button" class="btn btn-outline-primary">10</button>
          <button type="button" class="btn btn-outline-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...$$props}>
              <path fill="#0d6efd" d="m19.704 12l-8.491-8.727a.75.75 0 1 1 1.075-1.046l9 9.25a.75.75 0 0 1 0 1.046l-9 9.25a.75.75 0 1 1-1.075-1.046z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    
      <div>
  
      </div>
  
  
  
  
      </div>
  </div>


  <style>
    .table-c-primary {
      background-color: rgba(var(--bs-primary-rgb), var(--bs-bg-opacity)) !important;
    }
  
    .table-striped > tbody > tr:nth-child(2n + 1) > td,
    .table-striped > tbody > tr:nth-child(2n + 1) > th {
      background-color: rgba(#f8f9fa, 0.5);
    }
  </style>
  