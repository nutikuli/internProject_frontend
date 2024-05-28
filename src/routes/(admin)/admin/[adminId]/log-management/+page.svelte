<script>
 import Icon from '@iconify/svelte';
 import Table from '../../../../../components/Table.svelte'

// @ts-ignore
import Model from '/src/components/Model.svelte';
	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = ['#', 'รหัสผู้ใช้', 'ชื่อผู้ใช้','วันเวลา', 'เมนู', 'action', '','Title'];

	// สร้างตัวแปร rowRecords และกำหนดค่าเริ่มต้น
	/** @type {string[][]} */
	export let rowRecords = [
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
		['AD001','ตัวอย่าง ชื่อนามสกุล', '27/02/2567-18:46','บัญชีธนาคาร', 'เพิ่มข้อมูล', ''],
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
  
  <div class="w-100  min-vh-100 bg-white-subtle ">
      <div class="d-flex">
      <div class="w-100 bg-white ">
          <div class="w-100 bg-white  d-flex justify-content-between align-items-center px-3 py-2">
              <span style="font-size: 30px;">Log</span>
              <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      ส่งออก Excel
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">รายละเอียด Log</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">รหัสผู้ใช้ : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">xxxxxx</label>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" >ชื่อ : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">ตัวอย่างชื่อนามสกุล</label>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">วันเวลา : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">27/02/2567 - 18:46</label>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" >เมนู : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">บัญชีธนาคาร</label>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">Action : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">เพิ่มข้อมูล</label>
              </div>
            </div>
            <div class="mb-3 row">
              <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 13px;">รายละเอียด : </label>
              <div class="col-sm-10">
                <label  class="form-control-plaintext">xxxxxxxxx</label>
              </div>
            </div>
                
  
  
  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal">ปิดหน้าต่าง</button>
            
          </div>
          
        </div>
      </div>
    </div>
          </div>
      <div class="w-100 bg-white ">
        <Table {rowRecords} actionSelects={[ "VIEW"]} {colLabels}>
        
          <div slot="view-action">
            <form action="">
              <div class="modal-body">
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">รหัสผู้ใช้:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">xxxxxx</label>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" >ชื่อ:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">ตัวอย่างชื่อนามสกุล</label>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">วันเวลา:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">27/02/2567 - 18:46</label>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" >เมนู:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">บัญชีธนาคาร</label>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 14px;">Action:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">เพิ่มข้อมูล</label>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label for="staticEmail" class="col-sm-2 col-form-label" style="font-size: 13px;">รายละเอียด:</label>
                  <div class="col-sm-10">
                    <label  class="form-control-plaintext">xxxxxxxxx</label>
                  </div>
                </div>
                    
      
      
      
              </div>              <div class="modal-footer">
                <!-- ปุ่ม actions -->
           
                <button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
                  >ปิดหน้าต่าง</button
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
  