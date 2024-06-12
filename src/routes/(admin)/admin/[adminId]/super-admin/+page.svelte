<script>
import Icon from '@iconify/svelte';
import Table from '../../../../../components/Table.svelte'
import FileDropzone from '../../../../../components/FileDropzone.svelte';
import Model from '../../../../../components/Model.svelte'
import SuperAdminMAnageTable from './(component)/SuperAdminMAnageTable.svelte';

	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	let colLabels = ['#', 'รหัสผู้ดูแลระบบ', 'ชื่อ-นามสกุล ','อีเมล', 'เบอร์โทรศัพท์', 'สิทธิผู้ใช้งาน','สถานะ', 'Title']; 

  export let data;
  console.log(data.result)

  
  let rowRecordMapper = data.result.map((item) => {
  if (item.admin_data) {
    const ad = item.admin_data;
    return [
      ad.id,
      ad.name,
      ad.email,
      ad.phone,
      ad.permissionId,
      ad.status ? 'ใช้งาน' : 'ปิดการใช้งาน' 
    ];
  }
})
console.log(rowRecordMapper) 

	

  
 </script>
  
  <div class="w-100  min-vh-100 bg-white ">
      <div class="d-flex">
      <div class="w-100 bg-white ">
          <div class="w-100 bg-white shadow d-flex justify-content-between align-items-center px-3 py-2">
              <span style="font-size: 30px; font-weight: bold;">ผู้ดูแลระบบ</span>
              <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
      เพิ่มผู้ดูแลระบบ
    </button>
    
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <form method="post" action="?/registeradmin">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">ผู้ดูแลระบบ</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3 ">
              <label for="AdminImage" class="form-label col-2">รูปภาพ </label>
              <div class="col">
                <div class="d-flex gap-4 align-items-center">
                  <img
                    sizes="32"
                    src="https://via.placeholder.com/100"
                    class="img-thumbnail"
                    alt="Product Image"
                    id="productImagePreview"
                  />
                  <FileDropzone />
                </div>
              </div>
            </div>
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" >ชื่อ: </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputname" name="name" maxlength="100">
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">นามสกุล : </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputname" maxlength="100">
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">เบอร์โทรศัพท์ : </label>
                <div class="col-sm-10">
                  <input type="int" placeholder="placeholder" class="form-control" id="inputtel" name="phone" maxlength="10">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">สิทธิผู้ใช้งาน : </label>
                <div class="col-sm-10">
                  <select class="form-select" aria-label="Default select example">
                    <option selected>--select--</option>
                    <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
                    <option value="ฝ่ายบุคคล">ฝ่ายบุคคล</option>
                    <option value="พนักงานบัญชี">พนักงานบัญชี</option>
                    <option value="คนงาน">คนงาน</option>
                    <option value="ผู้จัดการ">ผู้จัดการ</option>
                    <option value="พัฒนาบุคคลากร">พัฒนาบุคคลากร</option>
                    <option value="โปรแกรมเมอร์">โปรแกรมเมอร์</option>
                    <option value="ผู้บริหาร">ผู้บริหาร</option>
                    <option value="พนักงานหน้าโกดัง">พนักงานหน้าโกดัง</option>
                    <option value="พนักงานจัดของ">พนักงานจัดของ</option>
                  </select>
                </div>
              </div>
             

              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">อีเมล : </label>
                <div class="col-sm-10">
                  <input type="email" placeholder="placeholder" class="form-control" id="inputPassword" name="email" maxlength="100">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">รหัสผ่าน : </label>
                <div class="col-sm-10">
                  <input type="password"  class="form-control" id="inputPassword" name="password" maxlength="100">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">ยืนยันรหัสผ่าน : </label>
                <div class="col-sm-10">
                  <input type="password"  class="form-control" id="inputPassword" maxlength="100">
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
      <div class="w-100 bg-white " >
        <SuperAdminMAnageTable
        {colLabels}
        {rowRecordMapper}
        ></SuperAdminMAnageTable>
       
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
  