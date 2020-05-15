<script>
  import Transfer from "./components/Transfer.svelte";
  import GetAccount from "./components/GetAccount.svelte";
  import GetAccounts from "./components/GetAccounts.svelte";
  import GetCustomer from "./components/GetCustomer.svelte";
  import UpdateCustomer from "./components/UpdateCustomer.svelte";
  let exception = undefined;
</script>

<style type="text/scss">
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  h2 {
    color: red;
    font-weight: 400;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
    crossorigin="anonymous" />
  <h1>Universal Bank App</h1>
  <Transfer bind:exception />
  <GetAccount bind:exception />
  <GetAccounts bind:exception />
  <GetCustomer bind:exception />
  <UpdateCustomer bind:exception />
  {#if exception}
    <div class="exception-handler">
      <h2 name="exceptionHolder">
        {exception.detailMessage ? exception.detailMessage : exception}
      </h2>
    </div>
  {/if}

</main>
