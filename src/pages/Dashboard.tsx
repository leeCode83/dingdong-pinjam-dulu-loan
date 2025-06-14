
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SkeletonLoader from "@/components/SkeletonLoader";
import { TrendingUp, Wallet, CreditCard, Plus, Eye, ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { useState, useEffect } from "react";

// Fungsi utama halaman Dashboard adalah:
// Menyajikan Ringkasan Finansial: Menampilkan data-data kunci seperti total jaminan, 
// sisa hutang, dan "Health Factor" dalam format yang mudah dicerna.
// Menyediakan Akses Cepat (Quick Actions): Memberikan tombol-tombol untuk tindakan paling 
// umum yang mungkin ingin dilakukan pengguna, seperti mengajukan pinjaman baru atau membayar cicilan.
// Menampilkan Detail Aset dan Aktivitas: Memberikan rincian tentang aset apa saja yang dijadikan 
// jaminan dan riwayat transaksi terbaru.


const Dashboard = () => {
  const [loading, setLoading] = useState(true); //state untuk loading

  //Hook ini dijalankan sekali setelah komponen pertama kali ditampilkan. 
  //Di dalamnya, ada setTimeout yang akan mengubah state loading menjadi false setelah 2 detik.
  //Untuk mensimulasikan pengalaman nyata di mana aplikasi butuh beberapa waktu untuk mengambil data dari server.
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard Saya</h1>
          <p className="text-muted-foreground">Kelola pinjaman dan jaminan crypto Anda</p>
        </div>

        {/* Stats Overview */}
        {loading ? (
          <SkeletonLoader type="stats" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Jaminan</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,500.00</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">+5.2%</span> dari bulan lalu
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pinjaman Aktif</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Rp 75,000,000</div>
                <p className="text-xs text-muted-foreground">
                  2 pinjaman aktif
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Health Factor</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-500">2.45</div>
                <p className="text-xs text-muted-foreground">
                  Status aman
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <Link to="/apply">
            <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Pinjaman Baru
            </Button>
          </Link>
          <Link to="/deposit-collateral">
            <Button variant="outline" className="w-full">
              <ArrowUpCircle className="w-4 h-4 mr-2" />
              Tambah Jaminan
            </Button>
          </Link>
          <Link to="/repay-loan">
            <Button variant="outline" className="w-full">
              <ArrowDownCircle className="w-4 h-4 mr-2" />
              Bayar Pinjaman
            </Button>
          </Link>
          <Link to="/loans">
            <Button variant="outline" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Kelola Pinjaman
            </Button>
          </Link>
          <Button variant="outline" className="w-full">
            <Wallet className="w-4 h-4 mr-2" />
            Tarik Jaminan
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Jaminan</CardTitle>
              <CardDescription>Aset crypto yang digunakan sebagai jaminan</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonLoader type="card" />
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">BTC</span>
                      </div>
                      <div>
                        <p className="font-medium">Bitcoin</p>
                        <p className="text-sm text-muted-foreground">0.25 BTC</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$10,500.00</p>
                      <p className="text-sm text-green-500">+2.3%</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">ETH</span>
                      </div>
                      <div>
                        <p className="font-medium">Ethereum</p>
                        <p className="text-sm text-muted-foreground">0.8 ETH</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$2,000.00</p>
                      <p className="text-sm text-red-500">-1.2%</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <CardTitle>Transaksi Terbaru</CardTitle>
              <CardDescription>Aktivitas terbaru pada akun Anda</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <SkeletonLoader type="table" />
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Tipe</TableHead>
                      <TableHead>Jumlah</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>10 Jun 2024</TableCell>
                      <TableCell>Pinjaman</TableCell>
                      <TableCell>Rp 50,000,000</TableCell>
                      <TableCell>
                        <Badge variant="default">Berhasil</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>8 Jun 2024</TableCell>
                      <TableCell>Deposit</TableCell>
                      <TableCell>0.15 BTC</TableCell>
                      <TableCell>
                        <Badge variant="default">Berhasil</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>5 Jun 2024</TableCell>
                      <TableCell>Pembayaran</TableCell>
                      <TableCell>Rp 2,500,000</TableCell>
                      <TableCell>
                        <Badge variant="default">Berhasil</Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
