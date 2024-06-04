<script>
import Icon from '@iconify/svelte';
import Table from '../../../../../components/Table.svelte'
// @ts-ignore
import Model from '/src/components/Model.svelte';
	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	 let colLabels = ['#', 'รหัสร้านค้า','ชื่อร้าน', 'ชื่อ-นามสกุล ','อีเมล', 'เบอร์โทรศัพท์', 'สถานะ', 'Title'];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	 let rowRecords = [
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ปิดใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ปิดใช้งาน'],
		['STR001','เลียจาน', 'Garrick Moss','Garrick@gmail.com', '098-5419653', 'ใช้งาน'],
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
          <div class="w-100 bg-white-subtle  d-flex justify-content-between align-items-center px-3 py-2">
              <span style="font-size: 30px;">ร้านค้า</span>
              <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      เพิ่มผู้ขาย
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content"> 
          <form action="?/registerstore" method="post">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ร้านค้า</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" >ชื่อ: </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputname" name="name">
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">นามสกุล : </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputname" name="surname">
                </div>
                
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">ชื่อร้านค้า: </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control"  name="storename">
                </div>
              </div>
              
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">ที่อยู่ : </label>
                <div class="col-sm-10">
                  <textarea class="form-control" id="inputaddress" rows="3" name="storelocation"></textarea>
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">เบอร์โทรศัพท์: </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputPassword" name="phone">
                </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">อีเมล : </label>
                <div class="col-sm-10">
                  <input type="email" placeholder="placeholder" class="form-control" id="inputPassword" name="email">
                </div>
              </div>

              
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">รหัสผ่าน : </label>
                <div class="col-sm-10">
                  <input type="password"  class="form-control" id="inputPassword" name="password">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">ยืนยันรหัสผ่าน : </label>
                <div class="col-sm-10">
                  <input type="password"  class="form-control" id="inputPassword">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">ใช้งาน : </label>
                <div class="col-sm-10">
                  <div class="form-check form-switch">
                    <input class="form-check-input"  type="checkbox" id="flexSwitchCheckChecked" checked>
                  </div>            
                  </div>
              </div>
             



        </div>
          <div class="modal-footer">
            <button type="submit" class="btn btn-primary">บันทึก</button>
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
                    <label for="inputPassword" class="col-sm-2 col-form-label" >ชื่อ:</label>
                    <div class="col-sm-10">
                      <input type="text" placeholder="placeholder" class="form-control" id="inputname">
                    </div>
                    
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">นามสกุล:</label>
                    <div class="col-sm-10">
                      <input type="text" placeholder="placeholder" class="form-control" id="inputname">
                    </div>
                    
                    
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">ชื่อร้านค้า:</label>
                    <div class="col-sm-10">
                      <input type="text" placeholder="placeholder" class="form-control" id="inputname">
                    </div>
                  </div>
                  
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">ที่อยู่:</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" id="inputaddress" rows="3"></textarea>
                    </div>
                    
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">เบอร์โทรศัพท์:</label>
                    <div class="col-sm-10">
                      <input type="text" placeholder="placeholder" class="form-control" id="inputPassword">
                    </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">อีเมล:</label>
                    <div class="col-sm-10">
                      <input type="email" placeholder="placeholder" class="form-control" id="inputPassword">
                    </div>
                  </div>
    
                  
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">รหัสผ่าน:</label>
                    <div class="col-sm-10">
                      <input type="password"  class="form-control" id="inputPassword">
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">ยืนยันรหัสผ่าน:</label>
                    <div class="col-sm-10">
                      <input type="password"  class="form-control" id="inputPassword">
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="inputPassword" class="col-sm-2 col-form-label">ใช้งาน:</label>
                    <div class="col-sm-10">
                      <div class="form-check form-switch">
                        <input class="form-check-input"  type="checkbox" id="flexSwitchCheckChecked" checked>
                      </div>            
                      </div>
                  </div>
                 
    
    
    
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

      <!--table-->

   
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