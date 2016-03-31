class VideoValidator < ActiveModel::Validator
  def validate(video)
    if !check_is_file(video.file)
      video.errors[:file] << "There was no file attached to upload."
    elsif check_size(video.size, video.file)
      video.errors[:file] << "File Too Large.  Maximum file size is 100MB"
    elsif !check_mp4(video.file.tempfile)
      video.errors[:file] << "That does not seem to be a valid mp4 file. Pick another video."
    end
  end

  def check_is_file(file)
    file && file.class.to_s.split("::").last == "UploadedFile"
  end

  def check_size(size, file)
    size.to_i > 104857600 || file.size() > 104857600
  end

  def check_mp4(file)
    begin
      MP4Info.new(file)
      true
    rescue
      file.rewind
      false
    end
  end

end

class Video
  include ActiveModel::Model
  include ActiveModel::Validations
  validates_with VideoValidator

  attr_accessor :file, :size, :url

  def increment_filename
    count = 1
    ext = File.extname(file.original_filename)
    unique_name = "#{count}#{ext}"

    while File.exist?("#{video_dir}#{count}#{ext}") do
      count += 1
      unique_name = "#{count}#{ext}"
    end

    unique_name
  end

  def write_file(protocol, host, port)
    filename = increment_filename
    port = port == 80 ? "" : ":#{port}"
    File.open("#{Rails.root}/#{video_dir}#{filename}", 'wb') { |file|
      self.file.rewind
      file.write(self.file.read)
    }

    self.url = "#{protocol}#{host}#{port}/videos/#{filename}"
  end

  def video_dir
    if Rails.env.test?
      'public/test/'
    else
      'public/videos/'
    end
  end
end
