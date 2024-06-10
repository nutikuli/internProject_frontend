<script>
	/**
	 * @typedef {Object} FileData
	 * @property {string} file_name
	 * @property {string} file_data
	 * @property {string} file_type
	 */

	/** @type {FileData[]} */
	export let imageFilesData = [];

	function isBase64(str) {
		const base64Regex =
			/^(data:image\/[a-zA-Z+-.]+;base64,)?(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
		return base64Regex.test(str);
	}

	function handleFileUpload(event) {
		const file = event.target.files[0];
		const reader = new FileReader();

		reader.onload = () => {
			const imageSource = reader.result;
			if (imageSource) {
				imageFilesData.push({
					file_name: file.name,
					file_data: imageSource.toString().replace(/^data:image\/\w+;base64,/, ''),
					file_type: file.type === 'image/jpeg' ? 'JPG' : 'PNG'
				});
				imageFilesData = imageFilesData;
			}
		};

		reader.readAsDataURL(file);
	}
</script>

<div class="row me-2 align-items-center gap-2">
	<label for="productImage" class="form-label col-2">รูปภาพ </label>
	<div class="col d-flex flex-wrap gap-4 align-items-center">
		{#each imageFilesData as src, i}
			<img
				width="62"
				height="62"
				src={isBase64(src.file_data)
					? `data:image/${src.file_type.toLowerCase};base64,${src.file_data}`
					: `http://${src.file_data}`}
				class="img-thumbnail"
				alt={src.file_name}
				id={`productImagePreview-${i}`}
			/>
		{/each}
		<div class="dropzone my-2">
			<div class="tw-flex tw-justify-center tw-text-center">
				<img src="http://100dayscss.com/codepen/upload.svg" sizes="32" class="upload-icon" />
			</div>
			<input type="file" accept=".jpeg,.png" on:input={handleFileUpload} class="upload-input" />
			<p style="position: relative; top: -20px" class="p-0 m-0">Upload</p>
		</div>
	</div>
</div>

<style>
	.dropzone:hover {
		cursor: pointer;
		opacity: 0.5;
		scale: 1.1;
		transition: all 0.3s ease-in-out;
	}

	.dropzone:not(:hover) {
		opacity: 1;
		scale: 1;
		transition: all 0.3s ease-out;
	}

	.frame {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 400px;
		height: 400px;
		margin-top: -200px;
		margin-left: -200px;
		border-radius: 2px;
		box-shadow: 4px 8px 16px 0 rgba(0, 0, 0, 0.1);
		overflow: hidden;
		background: linear-gradient(to top right, darkmagenta 0%, hotpink 100%);
		color: #333;
		font-family: 'Open Sans', Helvetica, sans-serif;
	}

	.center {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 300px;
		height: 260px;
		border-radius: 3px;
		box-shadow: 8px 10px 15px 0 rgba(0, 0, 0, 0.2);
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		flex-direction: column;
	}

	.title {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid #999;
		text-align: center;
	}

	h1 {
		font-size: 16px;
		font-weight: 300;
		color: #666;
	}

	.dropzone {
		width: 80px;
		height: 80px;
		border: 1px dashed #999;
		border-radius: 3px;
		text-align: center;
	}

	.upload-icon {
		margin: 15px 2px 2px 2px;
	}

	.upload-input {
		position: relative;
		top: 0%;
		cursor: pointer;
		left: 0;
		width: 100px;
		height: auto;
		opacity: 0;
	}

	.btn {
		display: block;
		width: 140px;
		height: 40px;
		background: darkmagenta;
		color: #fff;
		border-radius: 3px;
		border: 0;
		box-shadow: 0 3px 0 0 hotpink;
		transition: all 0.3s ease-in-out;
		font-size: 14px;
	}

	.btn:hover {
		background: rebeccapurple;
		box-shadow: 0 3px 0 0 deeppink;
	}
</style>
