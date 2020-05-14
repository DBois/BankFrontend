<script>
  import Transfer from "./components/Transfer.svelte";
  import GetAccount from "./components/GetAccount.svelte";
  import GetAccounts from "./components/GetAccounts.svelte";
  import GetCustomer from "./components/GetCustomer.svelte";
  import CreateCustomer from "./components/CreateCustomer.svelte";
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
  <Transfer />
  <GetAccount />
  <GetAccounts />
  <GetCustomer />
  <CreateCustomer />
</main>
