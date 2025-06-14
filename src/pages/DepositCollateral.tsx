
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { Copy, QrCode, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const DepositCollateral = () => {

  //State management
  //collateralType, amount, dan depositStatus adalah state yang berhubungan dengan seputar deposit kolateral
  // Seperti jenis kolateral, jumlahnya berapa, dan status dari deposit tersebut.
  //loading, akan menampilkan SkeletonLoader saat proses dimulai
  const [collateralType, setCollateralType] = useState("");
  const [amount, setAmount] = useState("");
  const [depositStatus, setDepositStatus] = useState("ready"); // ready, pending, confirmed, completed
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();   //digunakan untuk memberikan popup notifikasi pada halaman

  //variabel yang berisi objek nilai dari aset kripto
  // Nanti akan diganti dengan penggunaan kolateral
  const cryptoRates = {
    bitcoin: 42000,
    ethereum: 2500,
    usdt: 1,
    usdc: 1
  };

  const depositAddress = "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"; // Alamat pengiriman kolateral. Akan disesuaikan dengan produk jadinya nanti

  // Fungsi untuk menghitung perkiraan nilai deposit dalam USD berdasarkan jumlah dan jenis kripto yang dipilih.
  const calculateValue = () => {
    const amountNum = parseFloat(amount) || 0;  //mengubah input angka menjadi float
    const rate = cryptoRates[collateralType as keyof typeof cryptoRates] || 0;
    return amountNum * rate;
  };

  //Fungsi yang dijalankan saat tombol "Copy" ditekan. 
  // Menggunakan API navigator.clipboard untuk menyalin alamat wallet dan kemudian menampilkan notifikasi toast.
  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    toast({
      title: "Alamat Disalin",
      description: "Alamat deposit telah disalin ke clipboard",
    });
  };

  //Mensimulasikan proses deposit saat tombol "Konfirmasi Deposit" ditekan. 
  // Fungsi ini menggunakan setTimeout untuk mengubah depositStatus secara bertahap dari pending ke confirmed, lalu completed, 
  // meniru proses konfirmasi di jaringan blockchain.
  //Implementasi nanti akan disesuaikan
  const handleDeposit = () => {
    setLoading(true);
    setDepositStatus("pending");
    
    // Simulate transaction processing
    setTimeout(() => {
      setDepositStatus("confirmed");
      setLoading(false);
    }, 3000);

    setTimeout(() => {
      setDepositStatus("completed");
      toast({
        title: "Deposit Berhasil",
        description: "Jaminan telah berhasil ditambahkan ke akun Anda",
      });
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Tambah Jaminan</h1>
            <p className="text-muted-foreground">Setorkan crypto Anda sebagai jaminan untuk pinjaman</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Deposit Form */}
            <Card>
              <CardHeader>
                <CardTitle>Detail Jaminan</CardTitle>
                <CardDescription>Pilih jenis dan jumlah crypto yang ingin Anda setorkan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="crypto-type">Jenis Crypto</Label>
                  <Select value={collateralType} onValueChange={setCollateralType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis crypto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bitcoin">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdt">Tether (USDT)</SelectItem>
                      <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Jumlah</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.00000001"
                  />
                  {amount && collateralType && (
                    <p className="text-sm text-muted-foreground">
                      Nilai: ~${calculateValue().toLocaleString('en-US')}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900 mb-2">Peringatan Penting:</p>
                      <ul className="text-blue-700 space-y-1">
                        <li>• Hanya kirim {collateralType ? collateralType.toUpperCase() : 'crypto yang dipilih'} ke alamat ini</li>
                        <li>• Mengirim aset lain dapat menyebabkan kehilangan</li>
                        <li>• Minimum deposit: 0.001 {collateralType ? collateralType.toUpperCase() : ''}</li>
                        <li>• Konfirmasi memerlukan 2-6 konfirmasi jaringan</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Deposit Instructions */}
            <Card>
              <CardHeader>
                <CardTitle>Alamat Deposit</CardTitle>
                <CardDescription>Kirim crypto Anda ke alamat berikut</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {collateralType ? (
                  <>
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gray-100 border rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <QrCode className="w-16 h-16 text-gray-400" />
                      </div>
                      <p className="text-sm text-muted-foreground">QR Code untuk {collateralType.toUpperCase()}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Alamat Wallet</Label>
                      <div className="flex items-center space-x-2">
                        <Input value={depositAddress} readOnly className="font-mono text-sm" />
                        <Button size="sm" variant="outline" onClick={copyAddress}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-green-900 mb-1">Keamanan Terjamin</p>
                          <p className="text-green-700">
                            Alamat ini dikelola oleh smart contract yang aman dan telah diaudit.
                          </p>
                        </div>
                      </div>
                    </div>

                    {depositStatus === "ready" && (
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                        onClick={handleDeposit}
                        disabled={!amount || !collateralType || loading}
                      >
                        Konfirmasi Deposit
                      </Button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Pilih jenis crypto terlebih dahulu</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Transaction Status */}
          {depositStatus !== "ready" && (
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Status Transaksi
                </CardTitle>
                <CardDescription>Monitor status deposit Anda</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <SkeletonLoader type="card" />
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Status</span>
                      {depositStatus === "pending" && (
                        <Badge className="bg-yellow-100 text-yellow-800">Menunggu Konfirmasi</Badge>
                      )}
                      {depositStatus === "confirmed" && (
                        <Badge className="bg-blue-100 text-blue-800">Dikonfirmasi</Badge>
                      )}
                      {depositStatus === "completed" && (
                        <Badge className="bg-green-100 text-green-800">Selesai</Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span>Jumlah</span>
                      <span className="font-medium">{amount} {collateralType?.toUpperCase()}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Nilai</span>
                      <span className="font-medium">${calculateValue().toLocaleString('en-US')}</span>
                    </div>

                    {depositStatus === "completed" && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                          <div className="text-sm">
                            <p className="font-medium text-green-900 mb-1">Deposit Berhasil!</p>
                            <p className="text-green-700">
                              Jaminan Anda telah berhasil ditambahkan. Kembali ke dashboard untuk melihat update saldo.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DepositCollateral;
