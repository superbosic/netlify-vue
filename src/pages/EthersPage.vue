<template>
  <div>1</div>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers';

// const provider = new ethers.JsonRpcProvider('ethers/address/0x5724539BDE57e87f729AF6a7b6c15303365Ffd65#code#F1#L1');
const provider = new ethers.EtherscanProvider('');
const signer = await provider.getSigner();

console.log(signer);
</script>
