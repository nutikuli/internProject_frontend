<script>
	/** @type {string} */
	export let modalTitle;

	//- ตัวแปรไว้กำหนดตัวเปิด modal
	/** @type {string} */
	export let modalTargetId;
	export let classes = '';
</script>

<div
	class="modal fade {classes}"
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
			<div class="modal-body">
				<slot>
					<p>Modal body text goes here.</p>
				</slot>
			</div>
		</div>
	</div>
</div>
