<script>
    import Table from "../../../../../components/Table.svelte";
  </script>
  
  <div class="w-100  min-vh-100 bg-secondary-subtle ">
      <div class="d-flex">
      <div class="w-100 bg-white ">
          <div class="w-100 bg-white shadow d-flex justify-content-between align-items-center px-3 py-2">
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
      <div class="w-100 bg-white shadow d-flex justify-content-between align-items-center px-3 py-2">
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
      <Table/> 
    </div>
    
      <div>
  
      </div>
  
  
  
  
      </div>
  </div>
  