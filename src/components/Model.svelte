<script>
	/** @type {string} */
	export let modalTitle;

	//- ตัวแปรไว้กำหนดตัวเปิด modal
	/** @type {string} */
	export let modalTargetId;
</script>

<div
	class="modal fade"
	id={modalTargetId}
	data-bs-backdrop="static"
	data-bs-keyboard="false"
	tabindex="-1"
	aria-labelledby={modalTargetId}
	aria-hidden="true"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">{modalTitle || 'ชื่อ Modal'}</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			</div>
			<slot>
				<div class="modal-body">
					<p>Modal body text goes here.</p>
				</div>
			</slot>
			<slot name="action">
				<div class="modal-footer">
					<button type="button" class="btn btn-primary">บันทึก</button>
					<button type="button" class="btn btn-outline-primary" data-bs-dismiss="modal"
						>ยกเลิก</button
					>
				</div>
			</slot>
		</div>
	</div>
</div>
