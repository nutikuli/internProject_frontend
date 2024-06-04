<script>
  import Icon from '@iconify/svelte';
  import Table from '../../../../../components/Table.svelte'

  // @ts-ignore
  import Model from '/src/components/Model.svelte';
    // สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
    /** @type {string[]} */
     let colLabels = ['#', 'ชื่อบทบาท' ,'','เมนูที่เข้าถึงได้','','','','title'];
  
    // สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
    /** @type {string[][]} */
     let rowRecords = [
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
          <form action="">
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
        </form>
        </div>
      </div>
    </div>
          </div>
      <div class="w-100 bg-white ">
        <Table {rowRecords} actionSelects={["EDIT", "DELETE"]} {colLabels}>
          <div slot="editor-action">
            <form action="">
              <div class="modal-body">
                <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">ชื่อสิทธิ์:</label>
                    <div class="col-sm-10">
                      <input type="text" placeholder="placeholder" class="form-control" id="inputPassword">
                    </div>
                  </div>
                  <table class="table">
                    <thead>
                      <tr class="table-primary">
                        <th scope="col"style="justify-content: center;">รายการ</th>
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
                <!-- ปุ่ม actions -->
                <button type="button" class="btn btn-primary">บันทึก</button>
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
                  >ยกเลิก</button
                >
              </div>
            </form>
          </div>
          <div slot="delete-action">
            <form action="">
              <div class="mb-3 row">
                <p>คุณต้องการลบใช่หรือไม่</p>
              </div>
              <div class="modal-footer">
                <!-- ปุ่ม actions -->
                <button type="button" class="btn btn-primary">บันทึก</button>
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
                  >ยกเลิก</button
                >
              </div>
            </form>
          </div>
        </Table>   
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
  