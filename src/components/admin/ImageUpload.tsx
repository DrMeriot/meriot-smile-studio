import { useState, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ImageUploadProps {
  label: string;
  help?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

const ImageUpload = ({ label, help, value, onChange, folder = 'general' }: ImageUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 5 Mo");
      return;
    }

    setUploading(true);
    try {
      const ext = file.name.split('.').pop();
      const fileName = `${folder}/${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('site-images')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('site-images')
        .getPublicUrl(fileName);

      onChange(publicUrl);
      toast.success('✅ Image téléchargée avec succès !');
    } catch (err) {
      console.error(err);
      toast.error("Erreur lors de l'envoi de l'image");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemove = () => {
    onChange('');
    toast.success('Image supprimée');
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">{label}</Label>
      {help && <p className="text-xs text-muted-foreground">{help}</p>}

      {value && (
        <div className="relative w-40 h-40 rounded-lg overflow-hidden border bg-muted/30">
          <img src={value} alt="Aperçu" className="w-full h-full object-cover" />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-1 right-1 h-7 w-7"
            onClick={handleRemove}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}

      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={uploading}
          onClick={() => fileInputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          {uploading ? 'Envoi en cours…' : value ? 'Changer l\'image' : 'Choisir une image'}
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
