
import { useState } from 'react';

// material-ui
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Tooltip,
    TextField,
    CardMedia,
    InputAdornment,
    MenuItem
} from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

// assets
import {
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
    ShopOutlined,
    CloudUploadOutlined,
    EnvironmentTwoTone
} from '@ant-design/icons';

// ==============================|| MARKETPLACE PAGE ||============================== //

const initialProducts = [
    {
        id: 1,
        name: 'Semen Tiga Roda 50kg',
        price: 65000,
        category: 'Material Bangunan',
        stock: 100,
        description: 'Semen berkualitas tinggi untuk segala jenis bangunan.',
        location: 'Jakarta Barat',
        image: 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        name: 'Cat Dulux Weathershield 2.5L',
        price: 250000,
        category: 'Cat & Finishing',
        stock: 45,
        description: 'Cat eksterior tahan cuaca ekstrem.',
        location: 'Surabaya',
        image: 'https://images.unsplash.com/photo-1562259920-47afc305f369?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        name: 'Palu Kambing Besi',
        price: 85000,
        category: 'Alat Tukang',
        stock: 20,
        description: 'Palu besi kuat dengan gagang karet anti slip.',
        location: 'Bandung',
        image: 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
];

const categories = ['Material Bangunan', 'Cat & Finishing', 'Alat Tukang', 'Elektrikal', 'Plumbing.'];

export default function Marketplace() {
    const [products, setProducts] = useState(initialProducts);
    const [open, setOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        location: '',
        image: ''
    });
    const [previewImage, setPreviewImage] = useState(null);

    const handleOpen = () => {
        setOpen(true);
        setEditingId(null);
        setFormData({ name: '', price: '', category: '', stock: '', description: '', location: '', image: '' });
        setPreviewImage(null);
    };

    const handleEdit = (product) => {
        setEditingId(product.id);
        setFormData(product);
        setPreviewImage(product.image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setEditingId(null);
        setPreviewImage(null);
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setFormData({ ...formData, image: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus produk ini?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleSave = () => {
        if (!formData.name || !formData.price) {
            alert('Nama dan Harga wajib diisi!');
            return;
        }

        if (editingId) {
            setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
        } else {
            setProducts([...products, { ...formData, id: Date.now() }]);
        }
        handleClose();
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    };

    return (
        <MainCard title="Manajemen Produk Marketplace">
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button variant="contained" startIcon={<PlusOutlined />} onClick={handleOpen}>
                    Tambah Produk
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Produk</TableCell>
                            <TableCell>Kategori</TableCell>
                            <TableCell>Harga</TableCell>
                            <TableCell>Stok</TableCell>
                            <TableCell align="right">Aksi</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((row) => (
                            <TableRow key={row.id} hover>
                                <TableCell>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                                            image={row.image || 'https://via.placeholder.com/60'}
                                            alt={row.name}
                                        />
                                        <Box>
                                            <Stack direction="row" alignItems="center" spacing={0.5}>
                                                <Typography variant="subtitle1">{row.name}</Typography>
                                            </Stack>

                                            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                                                <EnvironmentTwoTone twoToneColor="#eb2f96" style={{ fontSize: '10px' }} />
                                                <Typography variant="caption" color="textSecondary">{row.location || 'Lokasi tidak tersedia'}</Typography>
                                            </Stack>

                                            <Typography variant="caption" color="textSecondary" sx={{ display: 'block', maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                                {row.description}
                                            </Typography>
                                        </Box>
                                    </Stack>
                                </TableCell>
                                <TableCell>{row.category}</TableCell>
                                <TableCell>{formatCurrency(row.price)}</TableCell>
                                <TableCell>
                                    <Typography color={row.stock < 10 ? 'error' : 'inherit'}>
                                        {row.stock} Unit
                                    </Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" onClick={() => handleEdit(row)}>
                                                <EditOutlined />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Hapus">
                                            <IconButton color="error" onClick={() => handleDelete(row.id)}>
                                                <DeleteOutlined />
                                            </IconButton>
                                        </Tooltip>
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                        {products.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Box sx={{ py: 3 }}>
                                        <ShopOutlined style={{ fontSize: '48px', color: '#ccc' }} />
                                        <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
                                            Belum ada produk. Silakan tambahkan produk baru.
                                        </Typography>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Form Dialog */}
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{editingId ? 'Edit Produk' : 'Tambah Produk Baru'}</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Box
                                sx={{
                                    width: '100%',
                                    height: 250,
                                    border: '2px dashed',
                                    borderColor: 'divider',
                                    borderRadius: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    bgcolor: 'grey.50'
                                }}
                            >
                                {previewImage ? (
                                    <img src={previewImage} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <>
                                        <CloudUploadOutlined style={{ fontSize: '32px', color: '#aaa' }} />
                                        <Typography variant="caption" color="textSecondary" sx={{ mt: 1 }}>Upload Foto Produk</Typography>
                                    </>
                                )}
                                <input
                                    accept="image/*"
                                    type="file"
                                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                                    onChange={handleImageUpload}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Stack spacing={2}>
                                <TextField
                                    label="Nama Produk"
                                    fullWidth
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <TextField
                                    label="Lokasi / Kota"
                                    fullWidth
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start"><EnvironmentTwoTone twoToneColor="#eb2f96" /></InputAdornment>,
                                    }}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Harga (Rp)"
                                            type="number"
                                            fullWidth
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                                            }}
                                            value={formData.price}
                                            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Stok"
                                            type="number"
                                            fullWidth
                                            value={formData.stock}
                                            onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        />
                                    </Grid>
                                </Grid>

                                <TextField
                                    select
                                    label="Kategori"
                                    fullWidth
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Deskripsi Produk"
                                    multiline
                                    rows={3}
                                    fullWidth
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">Batal</Button>
                    <Button onClick={handleSave} variant="contained" color="primary">Simpan Produk</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
}
