{global-page-top}

<title>A List Apart: {heading}</title>

<style>
	html { 
		height: 65%;
	}
	.main-wrapper{
		padding-bottom: 60px;
	}
</style>
</head>

<body data-xid="{XID_HASH}">

{primary-logo}

{global-nav}

<div role="main" class="main-wrapper single-column-display user-message-template">

	<div class="col-holder">

		<div class="main-content tools">

		<h1 class="basic-title">{heading}</h1>

		<div id="ee-errors">{content}</div>

	 	{link}{if logged_out} · <a href="/tools/log-in">Log In</a>{/if}

		</div> 


	</div>

</div>

{global-footer}

{global-page-bottom}
