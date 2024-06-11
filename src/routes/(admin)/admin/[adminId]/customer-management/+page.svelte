<script>

import Icon from '@iconify/svelte';
import Table from '../../../../../components/Table.svelte' 
 import CusromerManageTable from './(component)/CustomerManageTable.svelte'


// @ts-ignore
import Model from '/src/components/Model.svelte'; 
	import { enhance } from '$app/forms';
	import Swal from 'sweetalert2';
	import CustomerManageTable from './(component)/CustomerManageTable.svelte';


	// สร้างตัวแปร colLabels และกำหนดค่าเริ่มต้น
	/** @type {string[]} */
	export let colLabels = ['#', 'รหัสสมาชิก', 'ชื่อ-นามสกุล ','อีเมล', 'เบอร์โทรศัพท์', 'สถานะ', 'Title']; 

  export let data;
  console.log('cusdata',data)
  
  let rowRecordMapper = data.Customer.result.map((item) => {
  if (item.customer_data) {
    const cus = item.customer_data;
    return [
      cus.id,
      cus.name,
      cus.email,
      cus.phone,
      cus.status ? 'ใช้งาน' : 'ปิดการใช้งาน' 
    ];
  }
})
console.log(rowRecordMapper) 



	
  

</script>

<div class="w-100  min-vh-100 bg-white ">
	<div class="d-flex">
	<div class="w-100 bg-white ">
        <div class="w-100 bg-white shadow d-flex justify-content-between align-items-center px-3 py-2">
            <span style="font-size: 30px;">ลูกค้า</span>
            <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    เพิ่มลูกค้า
  </button>
  
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <form action="?/registercustomer" method="post">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">ลูกค้า</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
            <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" >ชื่อ: </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="name" name="name" >
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">นามสกุล : </label>
                <div class="col-sm-10">
                  <input type="text" placeholder="placeholder" class="form-control" id="inputname" name="surname">
                </div>
                
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" style="font-size: 14px;">เบอร์โทรศัพท์ : </label>
                <div class="col-sm-10">
                  <input type="int" placeholder="placeholder" class="form-control" id="inputtel" name="phone">
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label">ที่อยู่ : </label>
                <div class="col-sm-10">
                  <textarea class="form-control" id="inputaddress" rows="3" name="location"></textarea>
                </div>
              </div>
              <div class="mb-3 row">
                <label for="inputPassword" class="col-sm-2 col-form-label" >อีเมล : </label>
                <div class="col-sm-10">
                  <input type="email" placeholder="placeholder" class="form-control" id="inputPassword" name="email">
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
     <CustomerManageTable
		{colLabels}
		{rowRecordMapper}
	 ></CustomerManageTable>
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