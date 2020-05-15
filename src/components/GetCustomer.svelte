<script>
  import TextInput from "./modules/TextInput.svelte";
  import Button from "./modules/Button.svelte";
  import Spinner from "./modules/Spinner.svelte";
  import { getCustomer } from "./DataAccess/DataAccess";
  let cpr, loading, response;
  export let exception;

  const onSubmit = async e => {
    exception = undefined;
    loading = true;
    response = undefined;
    try {
      await getCustomer(cpr)
        .then(res => res.json())
        .then(json => (response = json));
      loading = false;
    } catch (err) {
      if (err.json) {
        await err.json().then(e => {
          exception = e;
          loading = false;
        });
      } else {
        exception = err;
        loading = false;
      }
    }
  };
</script>

<style>
  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
  }
</style>

<div class="get-account-container">
  <h2>Get customer</h2>
  <div class="input-container">
    <TextInput
      name="getcustomer-cpr"
      bind:value={cpr}
      placeholder="CPR number" />
    {#if loading === true}
      <Spinner />
    {:else}
      <Button name="getcustomer-submit" text="Submit" onclick={onSubmit} />
    {/if}
  </div>
  <div class="response">
    {#if response}
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">CPR</th>
            <th scope="col">Account Numbers</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th name="getcustomer-resname">{response.name}</th>
            <th name="getcustomer-rescpr">{response.cpr}</th>
            <th name="getcustomer-resnumbers">
              {response.accountNumbers.join(', ')}
            </th>
          </tr>
        </tbody>
      </table>
    {/if}

  </div>
</div>
