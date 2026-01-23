from rest_framework import serializers
from .models import Kelas, SetorHafalan
from accounts.models import User

class KelasSerializer(serializers.ModelSerializer):
    # Field untuk menampilkan nama-nama musyif (Read Only)
    nama_musyif = serializers.SerializerMethodField()
    
    # Field untuk menerima input banyak ID musyif dari frontend
    musyif_ids = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='MUSYIF'),
        source='musyif', # Menghubungkan langsung ke field 'musyif' di model
        many=True,
        required=False
    )

    class Meta:
        model = Kelas
        # PERBAIKAN: Masukkan musyif_ids ke sini agar tidak error
        fields = ['id', 'nama_kelas', 'target_hafalan', 'musyif_ids', 'nama_musyif']

    def get_nama_musyif(self, obj):
        # Mengambil semua musyif dan menggabungkan nama mereka dengan koma
        musyifs = obj.musyif.all()
        if musyifs.exists():
            return ", ".join([f"{m.first_name} {m.last_name}" for m in musyifs])
        return "-"

    def validate_target_hafalan(self, value):
        clean_val = ''.join(filter(str.isdigit, str(value)))
        if not clean_val:
            return "0 Surah"
        return f"{clean_val} Surah"
    
class SetorHafalanSerializer(serializers.ModelSerializer):
    nama_siswa = serializers.SerializerMethodField()
    nama_musyif = serializers.SerializerMethodField()
    nama_kelas = serializers.CharField(source='siswa.kelas', read_only=True)
    siswa_phone = serializers.CharField(source='siswa.phone_number', read_only=True)

    siswa = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='WALI_MURID')
    )
    musyif = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.filter(role='MUSYIF'),
        allow_null=True, 
        required=False
    )

    class Meta:
        model = SetorHafalan
        fields = [
            'id', 'tanggal', 'juz', 'surah', 'ayat', 'jenis_setoran', 
            'nilai', 'catatan', 'siswa', 'musyif', 
            'nama_siswa', 'nama_musyif', 'nama_kelas', 'siswa_phone', 'wa_sent'
        ]

    def get_nama_siswa(self, obj):
        return f"{obj.siswa.first_name} {obj.siswa.last_name}"

    def get_nama_musyif(self, obj):
        if obj.musyif:
            return f"{obj.musyif.first_name} {obj.musyif.last_name}"
        return "-"